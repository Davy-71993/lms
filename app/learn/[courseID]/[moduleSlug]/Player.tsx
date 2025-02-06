/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"

import { Enrolment, Module } from "@/lib/types"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { TbArrowForwardUp, TbPlayerPause, TbPlayerPlay } from "react-icons/tb"

type PlayerProps = {
  module: Module
  enrolment: Enrolment
}

export default function Player({ module, enrolment }: PlayerProps) {

  const courseID = useParams()["courseID"] as string | undefined

  // The player states
  const [ended, setEnded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(false)

  // Register a refference to the video element.
  const videoRef = useRef<HTMLVideoElement>(null)

  const pathName = usePathname()

  useEffect(()=>{
    const video = videoRef.current
    if(!video) return

    // Set the video source url
    video.src = module.video ?? ""

    video.addEventListener("play", ()=> {
      setPlaying(true)
    })

    video.addEventListener("pause", ()=> {
      setPlaying(false)
    })

    // If the module has videoStart and videoEnd points, set the current position of the video element
    // and register an eventListner to stop the player once the end point is reached.
    if(module.videoStart){
      video.currentTime = module.videoStart
    }
    
    video.addEventListener("timeupdate", ()=>{
      setProgress((video.currentTime/video.duration)*100)
      if(module.videoEnd && module.videoEnd <= video.currentTime){
        video.pause()
        setEnded(true)
      }else if(video.ended){
        setEnded(true)
      }
    })
  }, [module])

  useEffect(()=>{
    if(!progress || progress <= enrolment.progress) return
    
    // supabase.from("enrolments")
    // .update({progress})
    // .eq("courseID", courseID)
    // .eq("studentID", "1")
    // .then((data)=>{ console.log(data) })
    
  }, [courseID, progress, enrolment])

  const replay = () => {
    if(!videoRef.current) return
    setEnded(false)
    videoRef.current.currentTime = 0
    setTimeout(() => {
      videoRef.current?.play()
    }, 600);
  }

  return (
    <div className="w-full h-full max-w-4xl mx-auto rounded-lg text-sky-900 flex relative overflow-hidden ">
      <figure id="video" className={`w-full flex flex-col transition-all delay-500 absolute top-0 ${ ended ? "-left-10 opacity-0": "left-0 opacity-100"} `}>
            <video 
              ref={videoRef}
              id="video-player"  
              className='w-full h-auto rounded-lg border-2 border-sky-900'>
            </video>
            <div className="w-[97%] mx-auto -mt-5 h-1.5 rounded-full border border-sky-900">
              <div 
                style={{
                  width: progress+"%",
                }} 
                className={`h-full bg-sky-900 transition-all`}/>
            </div>
            
            <div className="flex gap-5 mt-5 px-5 py-1 bg-sky-900 rounded-full w-fit mx-auto">
              <button 
                className="p-2 rounded-full bg-sky-800 text-sky-100"
                onClick={()=>{
                  playing ? videoRef.current?.pause() : videoRef.current?.play()
                }}>
                { playing ? <TbPlayerPause size={20} /> : <TbPlayerPlay size={20} />}
              </button>
              <button 
                className="p-2 rounded-full bg-sky-800 text-sky-100"
                onClick={()=>{
                  if(videoRef.current){videoRef.current.currentTime = videoRef.current?.duration}
                }}>
                <TbArrowForwardUp size={20} />
              </button>
            </div>
            
      </figure>
      <div className={`w-full mt-20 absolute transition-all delay-500 text-sky-100 bg-sky-900 p-5 rounded-lg ${ended ? "right-0 opacity-100" : "-right-full opacity-0"}`}>
        <p className="text-center text-2xl font-[700] w-full max-w-xl mx-auto my-10">{ module.afterText}</p>
        <div className="w-full max-w-xl mx-auto p-5 flex gap-10">
          <button onClick={replay} className="w-full rounded-full px-5 py-2 text-2xl transition-colors bg-teal-500 hover:bg-teal-400">Replay</button>
         
            <Link href={`${pathName}/quiz`} className="w-full rounded-full px-5 py-2 text-2xl transition-colors bg-purple-500 text-center hover:bg-purple-400">{module.questions && module.questions.length > 0 ? "Take a quiz" : "Next module"}</Link>
        </div>
      </div>
    </div>

  )
}