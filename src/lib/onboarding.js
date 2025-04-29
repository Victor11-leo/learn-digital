'use server'
import axios from "axios";
import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";

export const completeOnboarding = async (formData) => {
  const { userId } = await auth()

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()  
  const role = formData.get('role')  
  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        role,                
      },
    })    
    redirect(`/${role}`)    
  } catch (err) {
    return { error: 'There was an error updating the user metadata.' }
  }
}



