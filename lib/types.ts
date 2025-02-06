
export type Course = {
    id: string
    video?: string
    duration?: number
    title: string
    descritpion: string
    modules: Module[],
    instructorID: string
}

export type Module = {
    id: string
    courseID: string
    title: string
    videoStart?: number
    videoEnd?: number
    video?: string
    slug: string
    progress: number
    description: string
    afterText?: string
    questions?: Quiz[]
}

export type Quiz = {
    id: string
    moduleID: string
    text: string,
    options: string
    answer: string
    result?: boolean
}

export type Enrolment = {
    id: string
    courseID: string
    studentID: string
    currentModuleID?: string
    moduleProgress?: number
    stage: number
    progress: number
    score: number
}

export type User = {
    id: string
    username: string
    paasword: string
}

export type Instructor = User

export type Student = User

export type Admin = User
