/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import supabase from '@/lib/supabase'
import { Enrolment, Quiz } from '@/lib/types'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
    quiz: Quiz[]
    enrolment: Enrolment
}

export default function QuizForm({ quiz, enrolment }: Props) {
    const [solutions, setSolutions] = useState<Quiz[]>(quiz)
    const [passed, setPassed] = useState(false)

    const handleSubmit = async(formData: FormData)=>{
        const s: any = {}

        quiz.forEach(qn => {
            s[`${qn.id}`] = formData.get(`qn-${qn.id}`)
        })

        const sln = quiz.map((qn)=> ({...qn, result: qn.answer === s[qn.id]}))
        setSolutions(sln)
    }

    useEffect(()=>{
        const res = solutions.map(s => s.result)
        const bool = !(res.includes(false) || res.includes(undefined))
        if(bool){
            supabase
                .from("enrolments")
                .update({stage: enrolment.stage + 1, progress: 0})
                .eq("id", enrolment.id)
                .select("*")
                .single()
                .then(data => {
                    console.log(data)
                })
        }
        setPassed(bool)
    }, [solutions, enrolment])

    if(!quiz || quiz.length === 0){
        supabase
            .from("enrolments")
            .update({stage: enrolment.stage+1})
            .eq("id", enrolment.id)
            .then(({ error})=>{
                if(error){
                    console.log(error)
                    return
                }
                return redirect(`/learn/${enrolment.courseID}`)
            })
        
    }

  return (
    <form action={ handleSubmit } className='w-full max-w-3xl rounded-lg text-sky-900 flex flex-col gap-5'>
        {
            solutions.map((question, index) => (
                <fieldset className={`w-full px-5 py-3 rounded-lg h-fit ${question.result === undefined ? "" : question.result ? "bg-teal-400 text-sky-100" : "bg-red-400 text-sky-100"}`} key={index}>
                    <p className="text-xl">Qn-{question.id}. {question.text}</p>
                    {
                        question.options.split(", ").map((op, ind)=>(
                            <div className="flex gap-5" key={ind}>
                                <input 
                                    id={op.split(". ")[0] + ind + index} 
                                    name={`qn-${question.id}`} 
                                    type="radio" 
                                    className='h-5 w-5'
                                    value={op.split(". ")[0]} />
                                <label htmlFor={op.split(". ")[0] + ind + index}>{op}</label>
                            </div>
                        ))
                    }
                </fieldset>
            ))
        }
        <div className="flex w-full h-24 relative overflow-hidden">
            <div className={`flex w-full gap-10 absolute top-0 transition-all delay-500 duration-300 ${passed ? "-left-10 opacity-0 -z-10"  : "left-0 opacity-100 z-10" }`}>
                <button type='button' className='w-full rounded-full bg-pink-500 text-sky-100 text-lg py-2 hover:shadow-lg hover:bg-pink-600 transition-all'>Back to Module</button>
                <button type='submit' className='w-full rounded-full bg-teal-500 text-sky-100 text-lg py-2 hover:shadow-lg hover:bg-teal-600 transition-all'>Submit Quiz</button>
            </div>
            <div className={`flex justify-end w-full absolute top-0 transition-all delay-500 duration-300 ${passed ? "right-0 opacity-100 z-10" : "-right-10 opacity-0 -z-10"}`}>
                <Link href={`/learn/${enrolment.courseID}`}>
                    <button 
                        type='button' 
                        className='w-fit px-5 rounded-full bg-purple-500 text-sky-100 text-lg py-2 hover:shadow-lg hover:bg-purple-600 transition-all'>
                        Continue to next module
                    </button>
                </Link>
            </div>
        </div>
    </form>
  )
}