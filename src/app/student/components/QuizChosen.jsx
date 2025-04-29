'use client'

import { Button } from '@/components/ui/button';
import { useQuery } from 'convex/react';
import { ArrowLeft, Check, Loader } from 'lucide-react';
import React, { useState } from 'react'
import { api } from '../../../../convex/_generated/api';
import { Input } from '@/components/ui/input';

const QuizChosen = ({quiz,setQuizSelected}) => {    
    const questions = useQuery(api.questions.getTasksByQuiz,{quizId:quiz._id})
    const [answers, setAnswers] = useState([
            { option: '', correct: false }
    ]);
    if (questions == undefined) return (
        <div className="h-full w-full flex items-center justify-center">
            <Loader className="animate-spin"/>
        </div>
    )
  return (
    <div>        
        <h2 className='font-semibold text-lg'>{quiz.title}</h2>
        <div className='grid gap-4 my-3'>
            <p>{quiz.passingPercentage}% is the passing grade</p>
            {questions.length < 1 ? 
            <>
                <p>There seems to be no questions</p>
            </>
            :
            <>
                {questions.map((q) => (
                    <div key={q._id}>
                        <p className='font-semibold'>{q.question}</p>
                        <div className='grid gap-2.5'>
                            {q.answers.map((a,i) => (
                                <div key={i} className='flex items-center justify-between bg-slate-950 text-white px-4 py-2 rounded-md'>
                                    <p>{a.option}</p>
                                    <Input
                                    type='checkbox'
                                    className='w-4'                                
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </>
            }
        </div>
        <div className='flex items-center gap-2'>
            <Button><Check/> Mark as complete</Button>
            <Button onClick={() => setQuizSelected(null)} variant='outline'><ArrowLeft/> Go back</Button>
        </div>
    </div>
    
  )
}

export default QuizChosen