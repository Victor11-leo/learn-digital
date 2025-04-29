'use client'
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Loader, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,    
    SelectItem,    
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { toast } from 'sonner';

function MultipleAnswersForm() {
    const quizes = useQuery(api.quizes.getTasks)
    const createQuestion = useMutation(api.questions.createTask)

    const [question,setQuestion] = useState("")
    const [quizId,setQuizId] = useState("")
    const [answers, setAnswers] = useState([
        { option: '', correct: false }
    ]);

    const [loading,setLoading] = useState(false)

    if (quizes == undefined) return (
        <div className="h-full w-full flex items-center justify-center">
          <Loader className="animate-spin"/>
        </div>
      )

    const handleChange = (index, field, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index][field] = value;
        setAnswers(updatedAnswers);
    };

    const addAnswer = () => {
        setAnswers([...answers, { option: '', correct: false }]);
    };

    const removeAnswer = (index) => {
        const updatedAnswers = answers.filter((_, i) => i !== index);
        setAnswers(updatedAnswers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            question,
            answers,
            quizId:quizId.length > 0 ? quizId : undefined
        }
        try {
            console.log(data);
            createQuestion(data)
            toast.success("Successful lesson creation")
            setLoading(false)
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong",{
                description:error.message
            })
            setLoading(false)
        }
    };

  return (
    <div className='grid gap-2.5'>
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Question</Label>
            <Input      
            onChange={(e) => setQuestion(e.target.value)}       
            type="text" id="email" placeholder="Intro" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Answers</Label>            
            {answers.map((answer, index) => (
                <div key={index} className="answer-input flex items-center gap-2.5">
                    <div className='flex items-center gap-1'>
                        <Input
                            type="text"
                            placeholder="Option text"
                            value={answer.option}
                            onChange={(e) => handleChange(index, 'option', e.target.value)}
                        />
                        <label className='flex items-center gap-1'>
                            <Input
                            type="checkbox"
                            className='w-4'
                            checked={answer.correct}
                            onChange={(e) => handleChange(index, 'correct', e.target.checked)}
                            />            
                        </label>
                    </div>
                <button onClick={() => removeAnswer(index)}><Trash/></button>
                </div>
            ))}
            <Button onClick={addAnswer}><Plus/></Button>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Link to quiz --optional</Label>
            <Select
            onValueChange = {(value) => setQuizId(value)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    {quizes.length == 0 ?
                     "There are no quizes"
                     :
                     <>
                        {quizes?.map((c) => (
                            <SelectItem key={c._id} value={c._id}>{c.title}</SelectItem>
                        ))}                        
                     </>
                    }
                </SelectContent>
            </Select>
        </div>    
      
      <Button 
        disabled={loading}
        onClick={handleSubmit}>{loading ? <Loader className='animate-spin'/> : "Create Course"}</Button>
    </div>
  );
}

export default MultipleAnswersForm;
