import { useEffect, useState } from 'react'
import { Button, Separator } from '@heroui/react'
import { buttonVariants } from '@heroui/styles'

const EMAIL = 'hello@interrupt.it.com'

type Lang = 'uk' | 'en'

const t = {
  uk: {
    eyebrow: 'Розробка для виробництва та складу',
    title: ['Перериваємо', 'рутину.'],
    lead: 'Невеликі застосунки під одну конкретну задачу. Починаємо з того, що дає користь тут і зараз, і крок за кроком рухаємось далі. Від одного дня роботи.',
    cta: 'Написати',
    whatTitle: 'Що робимо',
    what: [
      ['Облік і маркування', 'Етикетки, QR та штрихкоди, RFID.'],
      ['Складські застосунки', 'Прості інтерфейси для телефона чи ТЗД.'],
      ['Автоматизація рутини', 'Скрипти та інтеграції замість ручної роботи.'],
    ],
    howTitle: 'Як працюємо',
    how: [
      'Обираємо одну проблему, яка заважає найбільше',
      'Вирішуємо її за дні, а не місяці',
      'Ви бачите користь — беремося за наступну',
    ],
  },
  en: {
    eyebrow: 'Software for manufacturing & warehouses',
    title: ['Interrupt', 'the routine.'],
    lead: 'Small apps built for one specific job. We start with what pays off right here and now, and grow step by step. Starting from a single day of work.',
    cta: 'Get in touch',
    whatTitle: 'What we do',
    what: [
      ['Tracking & labeling', 'Labels, QR and barcodes, RFID.'],
      ['Warehouse apps', 'Simple interfaces for phones and scanners.'],
      ['Routine automation', 'Scripts and integrations instead of manual work.'],
    ],
    howTitle: 'How we work',
    how: [
      'Pick the one problem that hurts most',
      'Solve it in days, not months',
      'You see the value — we take the next step',
    ],
  },
} as const

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'uk' || saved === 'en') return saved
  } catch {
    /* ignore */
  }
  return navigator.language?.toLowerCase().startsWith('uk') ? 'uk' : 'en'
}

function Mark() {
  return (
    <span aria-hidden className="inline-flex items-center gap-[3px]">
      <span className="h-4 w-[5px] rounded-[1px] bg-foreground" />
      <span className="h-4 w-[5px] rounded-[1px] bg-accent" />
    </span>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const c = t[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const root = document.documentElement
      root.classList.toggle('dark', mq.matches)
      root.classList.toggle('light', !mq.matches)
      root.setAttribute('data-theme', mq.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-6 sm:px-10">
      <header className="flex items-center justify-between py-6">
        <a href="./" className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
          <Mark />
          Interrupt
        </a>
        <div className="flex items-center gap-1 text-sm" role="group" aria-label="Language">
          {(['uk', 'en'] as const).map((l) => (
            <Button
              key={l}
              size="sm"
              variant={lang === l ? 'secondary' : 'ghost'}
              onPress={() => setLang(l)}
              aria-pressed={lang === l}
              className="min-w-0 px-2.5 font-medium"
            >
              {l === 'uk' ? 'UA' : 'EN'}
            </Button>
          ))}
        </div>
      </header>

      <main className="flex-1">
        <section className="pt-20 pb-24 sm:pt-28 sm:pb-32">
          <p className="mb-6 text-sm font-medium text-muted">{c.eyebrow}</p>
          <h1 className="text-5xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-7xl">
            {c.title[0]}
            <br />
            <span className="text-accent">{c.title[1]}</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{c.lead}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={`mailto:${EMAIL}`} className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              {c.cta}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {EMAIL}
            </a>
          </div>
        </section>

        <Separator />

        <section className="grid gap-10 py-16 sm:grid-cols-[180px_1fr]">
          <h2 className="text-sm font-medium text-muted">{c.whatTitle}</h2>
          <ul className="grid gap-6">
            {c.what.map(([title, desc]) => (
              <li key={title}>
                <p className="font-medium">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        <section className="grid gap-10 py-16 sm:grid-cols-[180px_1fr]">
          <h2 className="text-sm font-medium text-muted">{c.howTitle}</h2>
          <ol className="grid gap-5">
            {c.how.map((step, i) => (
              <li key={step} className="flex items-baseline gap-5">
                <span className="w-8 shrink-0 font-mono text-sm text-accent tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-separator py-8 text-sm text-muted">
        <span>© {new Date().getFullYear()} Interrupt</span>
        <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-foreground">
          {EMAIL}
        </a>
      </footer>
    </div>
  )
}
