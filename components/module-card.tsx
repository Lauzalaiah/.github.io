"use client"

import { useState, useCallback } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { Module } from "@/lib/modules-data"
import { useProgress } from "@/lib/progress-context"
import {
  BookOpen,
  Briefcase,
  Users,
  Palette,
  FileText,
  Megaphone,
  TrendingUp,
  UserCheck,
  BarChart3,
  Rocket,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  CircleDot,
  XCircle,
  Lightbulb,
  GraduationCap,
  Sparkles,
} from "lucide-react"

const moduleIcons: Record<number, React.ElementType> = {
  1: BookOpen,
  2: Briefcase,
  3: Users,
  4: Palette,
  5: FileText,
  6: Megaphone,
  7: TrendingUp,
  8: UserCheck,
  9: BarChart3,
  10: Rocket,
  11: Sparkles,
}

export function ModuleCard({ module }: { module: Module }) {
  const Icon = moduleIcons[module.id] || BookOpen
  const [activeLesson, setActiveLesson] = useState<number | null>(null)
  const { isComplete, markComplete } = useProgress()

  const completedInModule = module.subsections.filter((_, i) =>
    isComplete(`${module.id}-${i}`)
  ).length
  const moduleProgress = Math.round(
    (completedInModule / module.subsections.length) * 100
  )

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card">
      <Accordion type="single" collapsible>
        <AccordionItem value={`module-${module.id}`} className="border-none">
          <AccordionTrigger className="px-5 py-5 hover:no-underline">
            <div className="flex items-start gap-4 text-left">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Icon className="size-5" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 font-sans text-xs font-semibold text-primary">
                    Module {module.id}
                  </span>
                  {moduleProgress > 0 && (
                    <span className="rounded-md bg-accent/20 px-2 py-0.5 font-sans text-xs font-semibold text-accent-foreground">
                      {moduleProgress}%
                    </span>
                  )}
                  {moduleProgress === 100 && (
                    <CheckCircle2 className="size-4 text-green-500" />
                  )}
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground">
                  {module.title}
                </h3>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  {module.subtitle}
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-foreground/80 transition-all duration-700 ease-out"
                    style={{ width: `${moduleProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="relative ml-0 overflow-hidden sm:ml-16">
              {/* Subsection list */}
              <div
                className={`flex flex-col gap-3 transition-all duration-500 ease-in-out ${
                  activeLesson !== null
                    ? "pointer-events-none absolute inset-0 -translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                {module.subsections.map((sub, index) => {
                  const lessonId = `${module.id}-${index}`
                  const done = isComplete(lessonId)
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveLesson(index)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/40 bg-secondary/50 p-4 text-left transition-all duration-200 hover:border-border hover:bg-secondary/80"
                    >
                      <div className="flex shrink-0 items-center justify-center">
                        {done ? (
                          <CheckCircle2 className="size-5 text-green-500" />
                        ) : (
                          <CircleDot className="size-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-sans text-sm font-semibold text-foreground">
                          {sub.title}
                        </h4>
                        <p className="mt-0.5 line-clamp-1 font-sans text-xs leading-relaxed text-muted-foreground">
                          {sub.content}
                        </p>
                      </div>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    </button>
                  )
                })}
              </div>

              {/* Lesson + Quiz panel */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  activeLesson !== null
                    ? "translate-x-0 opacity-100"
                    : "pointer-events-none absolute inset-0 translate-x-full opacity-0"
                }`}
              >
                {activeLesson !== null && (
                  <LessonQuizPanel
                    key={`${module.id}-${activeLesson}`}
                    module={module}
                    lessonIndex={activeLesson}
                    onBack={() => setActiveLesson(null)}
                    onComplete={() => {
                      markComplete(`${module.id}-${activeLesson}`)
                    }}
                    isCompleted={isComplete(`${module.id}-${activeLesson}`)}
                  />
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Lesson panel: Course first, then QCM after reading                 */
/* ------------------------------------------------------------------ */

function LessonQuizPanel({
  module,
  lessonIndex,
  onBack,
  onComplete,
  isCompleted,
}: {
  module: Module
  lessonIndex: number
  onBack: () => void
  onComplete: () => void
  isCompleted: boolean
}) {
  const sub = module.subsections[lessonIndex]
  const totalQuestions = sub.quiz.length
  const courseContent = sub.courseContent ?? []
  const hasCourse = courseContent.length > 0

  // Phase: "course" or "quiz"
  const [phase, setPhase] = useState<"course" | "quiz">(
    isCompleted ? "quiz" : hasCourse ? "course" : "quiz"
  )
  // Track which course paragraphs have been read
  const [readParagraphs, setReadParagraphs] = useState<Set<number>>(new Set())
  const [currentParagraph, setCurrentParagraph] = useState(0)

  // Quiz state
  const [answers, setAnswers] = useState<number[]>(
    () => new Array(totalQuestions).fill(-1)
  )
  const [currentQ, setCurrentQ] = useState(0)

  const quiz = sub.quiz[currentQ]
  const currentAnswer = answers[currentQ]
  const hasAnsweredCurrent = currentAnswer !== -1

  const answeredCount = answers.filter((a) => a !== -1).length
  const correctCount = answers.filter(
    (a, i) => a !== -1 && sub.quiz[i].answers[a]?.isCorrect
  ).length
  const allAnswered = answeredCount === totalQuestions
  const passed = correctCount >= Math.ceil(totalQuestions * 0.5)

  const allCourseRead = hasCourse
    ? readParagraphs.size >= courseContent.length
    : true

  const handleMarkRead = useCallback((idx: number) => {
    setReadParagraphs((prev) => {
      const next = new Set(prev)
      next.add(idx)
      return next
    })
  }, [])

  const handleSelectAnswer = useCallback(
    (answerIndex: number) => {
      if (hasAnsweredCurrent || isCompleted) return
      setAnswers((prev) => {
        const next = [...prev]
        next[currentQ] = answerIndex
        return next
      })
    },
    [currentQ, hasAnsweredCurrent, isCompleted]
  )

  const courseProgress = hasCourse
    ? Math.round((readParagraphs.size / courseContent.length) * 100)
    : 100

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <button
          onClick={phase === "quiz" && !isCompleted && hasCourse ? () => setPhase("course") : onBack}
          className="mt-0.5 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border/40 bg-secondary/60 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Retour"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex-1">
          <p className="font-sans text-xs font-semibold text-primary">
            Module {module.id} &mdash; Lecon {lessonIndex + 1}/
            {module.subsections.length}
          </p>
          <h4 className="font-serif text-base font-bold text-foreground">
            {sub.title}
          </h4>
        </div>
        {/* Phase indicator */}
        <div className="flex gap-1.5">
          {hasCourse && (
            <button
              onClick={() => setPhase("course")}
              className={`flex cursor-pointer items-center gap-1 rounded-md px-2.5 py-1 font-sans text-xs font-semibold transition-all ${
                phase === "course"
                  ? "bg-primary/15 text-primary"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen className="size-3" />
              Cours
            </button>
          )}
          <button
            onClick={() => {
              if (allCourseRead || isCompleted) setPhase("quiz")
            }}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-sans text-xs font-semibold transition-all ${
              phase === "quiz"
                ? "bg-primary/15 text-primary"
                : allCourseRead || isCompleted
                  ? "cursor-pointer bg-secondary/50 text-muted-foreground hover:text-foreground"
                  : "cursor-not-allowed bg-secondary/30 text-muted-foreground/40"
            }`}
          >
            <GraduationCap className="size-3" />
            QCM
            {!allCourseRead && !isCompleted && (
              <span className="ml-1 text-[10px] opacity-60">&#x1F512;</span>
            )}
          </button>
        </div>
      </div>

      {/* ===================== COURSE PHASE ===================== */}
      {phase === "course" && hasCourse && (
        <div className="flex flex-col gap-4">
          {/* Course progress bar */}
          <div className="flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-foreground/80 transition-all duration-500 ease-out"
                style={{ width: `${courseProgress}%` }}
              />
            </div>
            <span className="shrink-0 font-sans text-xs font-bold text-muted-foreground">
              {readParagraphs.size}/{courseContent.length}
            </span>
          </div>

          {/* Paragraphs navigation */}
          <div className="flex gap-1.5">
            {courseContent.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentParagraph(idx)}
                className={`h-1.5 flex-1 cursor-pointer rounded-full transition-all duration-300 ${
                  readParagraphs.has(idx)
                    ? "bg-green-500"
                    : idx === currentParagraph
                      ? "bg-foreground/50 ring-1 ring-foreground/20"
                      : "bg-secondary"
                }`}
              />
            ))}
          </div>

          {/* Current paragraph */}
          <div className="rounded-lg border border-border/40 bg-secondary/30 p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-xs font-bold text-primary">
                {currentParagraph + 1}
              </span>
              <h5 className="font-serif text-sm font-bold text-foreground">
                {courseContent[currentParagraph].heading}
              </h5>
            </div>
            <p className="font-sans text-sm leading-relaxed text-foreground/85">
              {courseContent[currentParagraph].text}
            </p>

            {courseContent[currentParagraph].tip && (
              <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-primary/20 bg-primary/5 p-3">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="font-sans text-xs leading-relaxed text-foreground/80">
                  <span className="font-bold text-primary">Conseil : </span>
                  {courseContent[currentParagraph].tip}
                </p>
              </div>
            )}

            {/* Mark as read button */}
            {!readParagraphs.has(currentParagraph) ? (
              <button
                onClick={() => handleMarkRead(currentParagraph)}
                className="mt-4 w-full cursor-pointer rounded-lg border border-border/40 bg-secondary/60 px-4 py-2.5 font-sans text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                J{"'"}ai lu et compris
              </button>
            ) : (
              <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-green-500/10 px-4 py-2.5">
                <CheckCircle2 className="size-3.5 text-green-500" />
                <span className="font-sans text-xs font-semibold text-green-400">
                  Lu
                </span>
              </div>
            )}
          </div>

          {/* Navigation between paragraphs */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setCurrentParagraph((p) => Math.max(0, p - 1))}
              disabled={currentParagraph === 0}
              className="cursor-pointer rounded-md border border-border/40 bg-secondary/60 px-4 py-2 font-sans text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              Precedent
            </button>
            <span className="font-sans text-xs font-medium text-muted-foreground">
              {currentParagraph + 1} / {courseContent.length}
            </span>
            {currentParagraph < courseContent.length - 1 ? (
              <button
                onClick={() =>
                  setCurrentParagraph((p) =>
                    Math.min(courseContent.length - 1, p + 1)
                  )
                }
                className="flex cursor-pointer items-center gap-1 rounded-md border border-border/40 bg-secondary/60 px-4 py-2 font-sans text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Suivant
                <ArrowRight className="size-3" />
              </button>
            ) : (
              <div className="w-20" />
            )}
          </div>

          {/* Unlock QCM button */}
          {allCourseRead && (
            <button
              onClick={() => setPhase("quiz")}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-sans text-sm font-bold text-primary-foreground transition-all duration-200 hover:bg-primary/90"
            >
              <GraduationCap className="size-4" />
              Passer au QCM
              <ArrowRight className="size-4" />
            </button>
          )}
        </div>
      )}

      {/* ===================== QUIZ PHASE ===================== */}
      {phase === "quiz" && (
        <div className="flex flex-col gap-4">
          {/* Already completed badge */}
          {isCompleted && (
            <div className="flex items-center justify-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3">
              <CheckCircle2 className="size-4 text-green-500" />
              <span className="font-sans text-sm font-semibold text-green-400">
                Lecon validee
              </span>
            </div>
          )}

          {/* Segmented progress bar */}
          <div className="flex items-center gap-3">
            <div className="flex flex-1 gap-1.5">
              {sub.quiz.map((_, idx) => {
                const a = answers[idx]
                const isAnswered = isCompleted || a !== -1
                const isCorrect =
                  isCompleted ||
                  (a !== -1 && sub.quiz[idx].answers[a]?.isCorrect)
                const isCurrent = idx === currentQ

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQ(idx)}
                    className={`h-2.5 flex-1 cursor-pointer rounded-full transition-all duration-300 ${
                      isAnswered
                        ? isCorrect
                          ? "bg-green-500"
                          : "bg-red-500"
                        : isCurrent
                          ? "bg-foreground/40 ring-2 ring-foreground/20"
                          : "bg-secondary"
                    }`}
                    aria-label={`Question ${idx + 1}`}
                  />
                )
              })}
            </div>
            <span className="shrink-0 font-sans text-xs font-bold text-muted-foreground">
              {isCompleted ? totalQuestions : answeredCount}/{totalQuestions}
            </span>
          </div>

          {/* Active quiz question */}
          {!isCompleted && (
            <>
              <div className="flex flex-col gap-3 rounded-lg border border-border/40 bg-card/50 p-4">
                {/* Question header */}
                <div className="flex items-start gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-sans text-xs font-bold text-primary">
                    Q{currentQ + 1}
                  </span>
                  <h5 className="font-sans text-sm font-semibold leading-relaxed text-foreground">
                    {quiz.question}
                  </h5>
                </div>

                {/* Answer options */}
                <div className="flex flex-col gap-2.5">
                  {quiz.answers.map((answer, idx) => {
                    const wasSelected = currentAnswer === idx
                    const showColors = hasAnsweredCurrent

                    let classes =
                      "border-border/40 bg-secondary/40 hover:bg-secondary/70 text-foreground/90"
                    let icon = null

                    if (showColors) {
                      if (answer.isCorrect) {
                        classes =
                          "border-green-500/60 bg-green-500/10 text-green-300"
                        icon = (
                          <CheckCircle2 className="size-5 shrink-0 text-green-500" />
                        )
                      } else if (wasSelected && !answer.isCorrect) {
                        classes = "border-red-500/60 bg-red-500/10 text-red-300"
                        icon = (
                          <XCircle className="size-5 shrink-0 text-red-500" />
                        )
                      } else {
                        classes =
                          "border-border/20 bg-secondary/20 text-muted-foreground/60"
                      }
                    }

                    const letterBg = showColors
                      ? answer.isCorrect
                        ? "border-green-500 bg-green-500/20 text-green-400"
                        : wasSelected
                          ? "border-red-500 bg-red-500/20 text-red-400"
                          : "border-border/30 text-muted-foreground/50"
                      : "border-border/60 text-muted-foreground group-hover/answer:border-primary/40 group-hover/answer:text-primary"

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(idx)}
                        disabled={hasAnsweredCurrent}
                        className={`group/answer flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 text-left transition-all duration-300 ${classes} ${
                          hasAnsweredCurrent
                            ? "cursor-default"
                            : "hover:border-primary/50"
                        }`}
                      >
                        <span
                          className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all ${letterBg}`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 font-sans text-sm leading-relaxed">
                          {answer.text}
                        </span>
                        {icon}
                      </button>
                    )
                  })}
                </div>

                {/* Explanation after answering */}
                {hasAnsweredCurrent && (
                  <div
                    className={`mt-1 rounded-lg border p-3 transition-all duration-500 ${
                      quiz.answers[currentAnswer]?.isCorrect
                        ? "border-green-500/30 bg-green-500/5"
                        : "border-red-500/30 bg-red-500/5"
                    }`}
                  >
                    <p className="font-sans text-xs leading-relaxed text-foreground/80">
                      <span
                        className={`font-bold ${
                          quiz.answers[currentAnswer]?.isCorrect
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {quiz.answers[currentAnswer]?.isCorrect
                          ? "Bonne reponse !"
                          : "Mauvaise reponse."}
                      </span>{" "}
                      {quiz.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation between questions */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
                  disabled={currentQ === 0}
                  className="cursor-pointer rounded-md border border-border/40 bg-secondary/60 px-4 py-2 font-sans text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Precedent
                </button>
                <span className="font-sans text-xs font-medium text-muted-foreground">
                  {currentQ + 1} / {totalQuestions}
                </span>
                {currentQ < totalQuestions - 1 ? (
                  <button
                    onClick={() =>
                      setCurrentQ((q) => Math.min(totalQuestions - 1, q + 1))
                    }
                    className="cursor-pointer rounded-md border border-border/40 bg-secondary/60 px-4 py-2 font-sans text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    Suivant
                  </button>
                ) : (
                  <div className="w-20" />
                )}
              </div>

              {/* Final results */}
              {allAnswered && (
                <div className="flex flex-col gap-3 rounded-lg border border-border/30 bg-card/50 p-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-sans text-sm font-bold text-foreground">
                      Resultat du quiz
                    </h5>
                    <span
                      className={`rounded-md px-2.5 py-1 font-sans text-xs font-bold ${
                        passed
                          ? "bg-green-500/15 text-green-400"
                          : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {correctCount}/{totalQuestions}{" "}
                      {passed ? "- Reussi !" : "- Echec"}
                    </span>
                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        passed ? "bg-green-500" : "bg-red-500"
                      }`}
                      style={{
                        width: `${Math.round(
                          (correctCount / totalQuestions) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  {passed ? (
                    <button
                      onClick={onComplete}
                      className="w-full cursor-pointer rounded-lg bg-green-600 px-4 py-3 font-sans text-sm font-bold text-white transition-all duration-200 hover:bg-green-500"
                    >
                      Valider et passer a la suite
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <p className="text-center font-sans text-xs text-muted-foreground">
                        {"Vous devez obtenir au moins 50% pour valider. Recommencez !"}
                      </p>
                      <button
                        onClick={() => {
                          setAnswers(new Array(totalQuestions).fill(-1))
                          setCurrentQ(0)
                        }}
                        className="w-full cursor-pointer rounded-lg border border-border/40 bg-secondary/60 px-4 py-3 font-sans text-sm font-semibold text-foreground transition-all duration-200 hover:bg-secondary"
                      >
                        Recommencer le quiz
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
