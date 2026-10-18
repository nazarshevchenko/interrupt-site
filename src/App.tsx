import { useEffect, useState } from 'react'
import { Button, Separator } from '@heroui/react'
import { buttonVariants } from '@heroui/styles'

const EMAIL = 'hello@interrupt.it.com'

type Lang = 'uk' | 'en'

// [input, output, title, description]
type Work = readonly [string, string, string, string]

const t = {
  uk: {
    eyebrow: 'Розробка для виробництва та складу',
    title: ['Перериваємо', 'рутину.'],
    lead: 'Невеликі застосунки під одну конкретну задачу. Починаємо з того, що дає користь тут і зараз, і крок за кроком рухаємось далі. Від одного дня роботи.',
    cta: 'Написати',
    worksTitle: 'Приклади',
    worksLead: 'Не велике впровадження, а одна корисна штука, яка запрацює вже цього тижня.',
    works: [
      ['Креслення', 'Маршрут', 'Верстат є, а програма до нього — ні', 'Рідне ПЗ нового верстата будувало хибний маршрут. Зробили свою програму: вона сама прокладає маршрут за кресленням і віддає верстату готове завдання.'],
      ['Модель', 'Собівартість', 'Ціна виробу за хвилину', 'Замість ручних розрахунків у Excel — калькулятор, що бере матеріали й роботи з довідника і одразу показує собівартість і маржу.'],
      ['QR', 'Статус', 'Де зараз замовлення', 'Працівник сканує код на кожному етапі. Видно, що в роботі, що готове і скільки зроблено за день — без дзвінків і журналів.'],
      ['Видача', 'Облік', 'Хто що взяв зі складу', 'Інструмент і витратні матеріали видаються з телефона на конкретну людину. Паперовий журнал більше не потрібен.'],
      ['Пристрій', 'Система', 'Обладнання на зв’язку з обліком', 'Дані зі зчитувачів і верстатів одразу потрапляють у систему, а не переписуються вручну.'],
      ['Операція', 'Оплата', 'Відрядна оплата без калькулятора', 'Кожна виконана операція фіксується, а нарахування працівникам рахуються автоматично за розцінками.'],
    ] as readonly Work[],
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
    worksTitle: 'Examples',
    worksLead: 'Not a big rollout — one useful tool that works this week.',
    works: [
      ['Drawing', 'Toolpath', 'A new machine with useless software', 'The machine’s own software built the wrong toolpath. We wrote our own: it plans the path from the drawing and hands the machine a ready job.'],
      ['Model', 'Cost', 'Product cost in a minute', 'Instead of manual Excel math — a calculator that pulls materials and labor from a catalog and shows cost and margin right away.'],
      ['QR', 'Status', 'Where is the order now', 'Workers scan a code at each stage. You see what’s in progress, what’s done and the daily output — no calls or logbooks.'],
      ['Issue', 'Record', 'Who took what from the stock', 'Tools and consumables are issued from a phone to a specific person. No more paper logbook.'],
      ['Device', 'System', 'Equipment that talks to your records', 'Data from readers and machines goes straight into the system instead of being retyped by hand.'],
      ['Task', 'Pay', 'Piece-rate pay without a calculator', 'Every completed operation is logged, and worker pay is calculated automatically from the rates.'],
    ] as readonly Work[],
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

  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-5 sm:px-8 lg:px-10">
      <header className="flex items-center justify-between py-5">
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
        <section className="pt-8 pb-14 sm:pt-14 sm:pb-20">
          <p className="mb-5 text-sm font-medium text-muted">{c.eyebrow}</p>
          <h1 className="text-5xl leading-[1.02] font-semibold tracking-[-0.035em] sm:text-7xl">
            {c.title[0]}
            <br />
            <span className="text-accent">{c.title[1]}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{c.lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
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

        <section className="py-12 sm:py-16">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">{c.worksTitle}</h2>
            <p className="max-w-md text-sm leading-relaxed text-muted">{c.worksLead}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.works.map(([from, to, title, desc]) => (
              <li
                key={title}
                className="flex flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="rounded-md bg-background-secondary px-2 py-1 text-muted">{from}</span>
                  <span aria-hidden className="text-accent">
                    →
                  </span>
                  <span className="rounded-md bg-accent-soft px-2 py-1 text-accent-soft-foreground">{to}</span>
                </div>
                <p className="mt-5 font-semibold">{title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        <div className="grid gap-x-16 md:grid-cols-2">
          <section className="grid gap-6 py-12 sm:py-16">
            <h2 className="text-sm font-medium text-muted">{c.whatTitle}</h2>
            <ul className="grid gap-5">
              {c.what.map(([title, desc]) => (
                <li key={title}>
                  <p className="font-medium">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="grid content-start gap-6 border-t border-separator py-12 sm:py-16 md:border-t-0">
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
        </div>
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
