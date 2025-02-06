import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Course, Enrolment } from '@/lib/types'
import { MdLockOutline } from 'react-icons/md'
import supabase from '@/lib/supabase'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any
}

export default async function CoursePage({params}: Props) {
    const id = (await params)['courseID'] as string | undefined

    const { data } = await supabase.from("courses").select("*, modules(*)").eq("id", id)
    const course: Course  = (data  as Course[])[0]

    const res = await supabase.from("enrolments").select("*").eq("courseID", course.id)
    const enrolment: Enrolment  = (res.data  as Enrolment[])[0]


    if(!course || !enrolment){
        console.log({course, enrolment})
        redirect("/learn?err=Invalid course id.")
    }
  return (
    <div className='w-full flex flex-col gap-10 text-sky-900 p-5'> 
        <div className="flex flex-col gap-3 pt-5">
            <h1 className="text-4xl text-center pt-5">{course.title}</h1>
            <p className="text-xl w-full max-w-2xl mx-auto">{ course.descritpion}</p>
        </div>
        <div className="w-full max-w-6xl mx-auto p-5 border-2 rounded-lg border-sky-900 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                course.modules.map((module, index) => (
                    <Link aria-disabled key={index} href={ enrolment.stage >= index ? `/learn/${course.id}/${module.slug}` : "#"}>
                        <div className="w-full h-full relative shadow-lg rounded-lg bg-sky-100 p-5 flex flex-col gap-3" key={index}>
                            <div className="flex-1">
                                <h1 className="text-2xl text-center">{module.title}</h1>
                                <p className="text-lg">{module.description}</p>
                            </div>
                            {
                                enrolment.stage >= index ?
                                <div className="w-ful rounded-full bg-sky-200 p-1 flex justify-center items-center">{enrolment.stage === index ? enrolment.progress : "100"}%</div>
                                :
                                <div className="absolute w-full h-full bg-sky-950/90 rounded-lg top-0 left-0 text-sky-100 flex justify-center items-center">
                                    <MdLockOutline size={100} />
                                </div>
                            }
                            
                        </div>

                    </Link>
                ))
            }
        </div>
    </div>
  )
}