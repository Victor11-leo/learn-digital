'use client'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { Download, Loader } from 'lucide-react'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Certificate from '../components/Certificate'

const page = () => {
  const {user} = useUser()
  if (user ==  undefined) return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="animate-spin"/>
    </div>
  )  
  return (
    <div>
      <h2 className='font-semibold text-xl'>My certifications</h2>
      <CertificationListing user={user}/>
    </div>
  )
}

const CertificationListing = ({user}) => {
  const certifications = useQuery(api.certifications.getTasksByUser,{userId:user.id})
  if (certifications ==  undefined) return (
    <div className="h-full w-full flex items-center justify-center">
      <Loader className="animate-spin"/>
    </div>
  )  

  function formatRelativeTime(timestamp) {
    const now = Date.now();
    const diff = timestamp - now;
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
  
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days === -1) return 'Yesterday';
    if (days > 1 && days <= 6) return `in ${days} days`;
    if (days >= 7 && days < 30) return `in ${Math.round(days / 7)} week(s)`;
    if (days < -1 && days >= -6) return `${Math.abs(days)} days ago`;
    if (days <= -7 && days > -30) return `${Math.round(Math.abs(days) / 7)} week(s) ago`;
  
    const months = Math.round(Math.abs(days) / 30);
    return diff > 0 ? `in ${months} month(s)` : `${months} month(s) ago`;
  }
  console.log(certifications);
  return (
    <div className='max-w-5xl mx-auto'>
      {certifications.map((d) => {
        const skills = d.course.skills.split(",")
        const result = formatRelativeTime(d._creationTime);
        return (
        <section key={d._id} className='flex items-center justify-between shadow-md p-2 rounded-xl'>
          <div>
            <p className='font-semibold text-lg'>{d.course.title}</p>
            <div className='flex items-center gap-1.5 flex-wrap pt-2'>
              {skills.map((d,i) => (
                <p className='text-xs bg-amber-500 text-white rounded-md px-2 py-1 w-fit' key={i}>{d}</p>
              ))}
            </div>
          </div>     
          <div>
            <p>Acquired {result}</p>
          </div>     
          <div>
            <PDFDownloadLink
              document={
                <Certificate
                  studentName={`${user.firstName} ${user.lastName}`}
                  courseTitle={d.course.title}
                  skills={d.course.skills}
                />
              }
              fileName="certificate.pdf"
            >              
              <Download/>
            </PDFDownloadLink>            
          </div>
        </section>
      )})}
    </div>
  )
}

export default page