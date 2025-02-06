/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import supabase from '@/lib/supabase'
import Player from './Player'

type PageProps = {
  params: any
}
export default async function page({ params }: PageProps) {

  // We get the target module using the module slug included in the url params.
  const moduleSlug = (await params)['moduleSlug']
  const { data, error } = await supabase.from("modules").select("*, questions(text, options, answer)").eq("slug", moduleSlug).single()

  // Incase the course has one single long video, the modules will not have individual videos.
  // This means that we need to take this course video and append it each of the modules.
  // Each of the modules indicates where the video should start playing and end for the specific contents 
  // of that module. 
  const courseID = (await params)['courseID']
  const cRes = await supabase.from("courses").select("video").eq("id", courseID).single()

  const enrolment = (await supabase.from("enrolments").select("*").eq("courseID", courseID).eq("studentID", "1").single()).data
  const course = cRes.data

  // If the module does not have a video then set the module video to the course video.
  if(!data.video){
    data.video = course?.video
  }

  return (
    <div className='w-full h-[90vh] p-5'>
        <Player module={ data } enrolment={ enrolment } />
    </div>
  )
}