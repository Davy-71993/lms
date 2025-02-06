/* eslint-disable @next/next/no-assign-module-variable */
/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/lib/supabase'
import React from 'react'
import QuizForm from './QuizForm'

type PageProps = {
  params: any
}
export default async function QuizPage({ params }: PageProps) {
  const moduleSlug = (await params)['moduleSlug']

  const module = (await supabase.from("modules").select("*, courses(*), questions(*)").eq("slug", moduleSlug).single()).data
  const enrolment = (await supabase.from("enrolments").select("*").eq("courseID", module.courseID).eq("studentID", "1").single()).data
  const quiz = module.questions

  return (
    <div className='w-full flex flex-col justify-center items-center overflow-hidden p-5 gap-5'>
      <h1 className="text-2xl text-sky-900"><span className='font-bold'>Quiz: </span> Module-{enrolment.stage+1}.</h1>
      <QuizForm quiz={ quiz} enrolment={enrolment} />
    </div>
  )
}