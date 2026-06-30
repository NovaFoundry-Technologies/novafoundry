import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Clock3,
  Code2,
  Palette,
  Plus,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Seo from "../Seo";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import examprep from "../assets/examprep.png";
import mediprep from "../assets/mediprep.png";
import foodmartex from "../assets/foodmartex.png";
import tfalcon from "../assets/tfalcon.jpeg";
import heroPortrait from "../assets/hero.png";
import man from "../assets/man.png";
import formPic from "../assets/formpic.png";
import internshipImage from "../assets/IMG_20260524_192825.png";
import avatar from "../assets/user.png";

const courses = [
  {
    title: "UI/UX Design Foundations",
    category: "Product design",
    duration: "8 weeks",
    image: examprep,
    accent: "bg-[#ff713d]",
  },
  {
    title: "Frontend Development",
    category: "Development",
    duration: "10 weeks",
    image: mediprep,
    accent: "bg-[#8275ee]",
  },
  {
    title: "Brand Strategy & Identity",
    category: "Brand design",
    duration: "6 weeks",
    image: foodmartex,
    accent: "bg-[#82a976]",
  },
  {
    title: "Product Management",
    category: "Product",
    duration: "8 weeks",
    image: tfalcon,
    accent: "bg-[#708078]",
  },
];

const testimonials = [
  {
    quote:
      "The program gave me structure, real project experience, and the confidence to present my work professionally.",
    name: "Mary James",
    role: "Product designer",
  },
  {
    quote:
      "I moved from tutorials to shipping real interfaces. The feedback from mentors made the difference.",
    name: "Daniel Cole",
    role: "Frontend developer",
  },
  {
    quote:
      "Every module was practical. By the end, I had a portfolio and a much clearer career direction.",
    name: "Sarah Ade",
    role: "Brand designer",
  },
  {
    quote:
      "The community is generous and ambitious. I met collaborators I still work with today.",
    name: "James Noah",
    role: "Product manager",
  },
];

const faqs = [
  [
    "What experience do I need before applying?",
    "No professional experience is required. Curiosity, consistency, and a willingness to learn are enough to begin.",
  ],
  [
    "Do you offer customized learning paths?",
    "Yes. Mentors help you choose projects and focus areas that support your preferred career direction.",
  ],
  [
    "How does the onboarding process work?",
    "After enrollment, you receive an orientation schedule, learning roadmap, community access, and your first project brief.",
  ],
  [
    "Will I receive a certificate?",
    "Students who complete the required modules and final project receive a NovaFoundry completion certificate.",
  ],
  [
    "How long does it take to complete?",
    "Most tracks run for six to ten weeks, depending on the course and your weekly learning pace.",
  ],
  [
    "Will I work on real projects?",
    "Every track includes practical briefs designed around the way modern product teams actually work.",
  ],
];

const container =
  "mx-auto w-[min(1180px,calc(100%-48px))] max-[640px]:w-[calc(100%-32px)]";

function CourseCard({ course }: { course: (typeof courses)[number] }) {
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[1.35] overflow-hidden rounded-xl bg-[#e9e9e4]">
        <img
          src={course.image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span
          className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[9px] font-semibold text-white ${course.accent}`}
        >
          Featured
        </span>
      </div>
      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <p className="mb-1 text-[9px] font-semibold tracking-[.08em] text-[#ff6b16] uppercase">
            {course.category}
          </p>
          <h3 className="text-sm font-semibold tracking-[-.02em]">
            {course.title}
          </h3>
        </div>
        <ArrowRight
          className="mt-1 shrink-0 transition group-hover:translate-x-1"
          size={15}
        />
      </div>
      <div className="mt-3 flex items-center gap-4 border-t border-black/10 pt-3 text-[9px] text-black/45">
        <span className="flex items-center gap-1">
          <Clock3 size={11} /> {course.duration}
        </span>
        <span className="flex items-center gap-1">
          <Users size={11} /> Live cohort
        </span>
      </div>
    </article>
  );
}

function EnrolledPage() {
  return (
    <>
      <Seo
        title="NovaFoundry Internship Program"
        description="Gain practical product, design, and development skills through NovaFoundry's mentor-led internship program."
        url="https://novafoundry.org/internship"
      />

      <main className="min-h-screen overflow-hidden bg-amber-50 text-[#090909]">
        <div className="bg-[radial-gradient(circle_at_86%_18%,rgba(235,182,242,.62),transparent_34%),radial-gradient(circle_at_48%_6%,rgba(198,203,255,.65),transparent_32%),linear-gradient(145deg,#fffdf8_28%,#fff_72%)]">
          <Navbar />

          <section
            className={`${container} relative flex min-h-[650px] flex-col items-center justify-center pt-16 text-center max-[640px]:min-h-[700px]`}
          >
            <div className="absolute top-20 left-0 flex items-center gap-2 text-[9px] font-semibold tracking-[.08em] uppercase max-[640px]:hidden">
              <span className="h-2 w-2 rounded-full bg-[#ff6b16]" />
              Learn. Build. Launch.
            </div>

            <div className="mb-5 flex -space-x-2">
              {[heroPortrait, man, formPic].map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt=""
                  className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  style={{ zIndex: 3 - index }}
                />
              ))}
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-[#090909] text-[9px] text-white">
                +80
              </span>
            </div>

            <p className="mb-5 text-[10px] font-semibold tracking-[.13em] uppercase">
              NovaFoundry Internship Program
            </p>
            <h1 className="max-w-[780px] text-[clamp(48px,7.2vw,98px)] leading-[.88] font-semibold tracking-[-.075em]">
              Gain skills, Certifications.
              <span className="block text-[#b5b5b0]">Within 72hrs.</span>
            </h1>
            <p className="mt-7 max-w-[540px] text-xs leading-5 text-black/50">
              Build practical skills with mentors, real briefs, and a creative
              community designed to help you move confidently into your next
              role.
            </p>
            <a
              href="#courses"
              className="mt-7 inline-flex items-center gap-3 rounded-md bg-[#090909] px-5 py-3 text-[11px] font-semibold text-white transition hover:-translate-y-0.5"
            >
              Explore programs <ArrowRight size={14} />
            </a>

            <div className="relative mt-14 h-[205px] w-full max-w-[650px]">
              {[heroPortrait, man, formPic, internshipImage].map(
                (image, index) => (
                  <div
                    key={image}
                    className="absolute bottom-0 overflow-hidden rounded-t-[70px] bg-[#171717]"
                    style={{
                      width: index === 1 || index === 2 ? "29%" : "25%",
                      height: index === 1 || index === 2 ? "100%" : "80%",
                      left: `${index * 23.5 + 3}%`,
                      zIndex: index === 1 || index === 2 ? 2 : 1,
                    }}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ),
              )}
            </div>
          </section>
        </div>

        <section className="border-y border-black/10 py-5">
          <div
            className={`${container} flex flex-wrap justify-center gap-x-10 gap-y-4`}
          >
            {[
              [Palette, "UI/UX Design"],
              [Code2, "Development"],
              [BriefcaseBusiness, "Product"],
              [Award, "Certification"],
              [Users, "Community"],
              [BookOpen, "Live learning"],
            ].map(([Icon, label]) => {
              const ItemIcon = Icon as typeof Palette;
              return (
                <span
                  className="flex items-center gap-2 text-[9px] font-medium text-black/55"
                  key={label as string}
                >
                  <ItemIcon size={14} /> {label as string}
                </span>
              );
            })}
          </div>
        </section>

        <section className={`${container} py-24`} id="courses">
          <div className="mb-10 flex items-end justify-between gap-8">
            <div>
              <p className="mb-3 text-[10px] font-semibold tracking-[.1em] text-[#ff6b16] uppercase">
                Start learning
              </p>
              <h2 className="text-[clamp(34px,4.5vw,58px)] leading-none font-semibold tracking-[-.055em]">
                Highlighted Courses
              </h2>
            </div>
            <p className="max-w-[300px] text-[10px] leading-4 text-black/45 max-[700px]:hidden">
              Focused learning tracks built around practical work, thoughtful
              mentorship, and skills modern teams need.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
            {courses.map((course) => (
              <CourseCard course={course} key={course.title} />
            ))}
          </div>
        </section>

        <section className={`${container} py-24`}>
          <p className="mb-4 text-[10px] font-semibold tracking-[.1em] text-[#ff6b16] uppercase">
            Learning that travels with you
          </p>
          <h2 className="max-w-[830px] text-[clamp(34px,5vw,64px)] leading-[.98] font-medium tracking-[-.055em]">
            We help brands express their vision through innovative design,
            compelling storytelling and strategic solutions that leave a
            lasting impression.
          </h2>

          <div className="mt-20 grid grid-cols-2 gap-12 max-[760px]:grid-cols-1">
            <article className="grid grid-cols-2 gap-5">
              <div className="flex flex-col justify-between rounded-xl bg-white p-6">
                <strong className="text-4xl tracking-[-.06em]">120+</strong>
                <div>
                  <h3 className="text-sm font-semibold">Happy students</h3>
                  <p className="mt-2 text-[10px] leading-4 text-black/45">
                    Learners who built portfolio-ready work with our mentors.
                  </p>
                </div>
              </div>
              <img
                src={internshipImage}
                alt="Student working"
                className="aspect-[.8] h-full w-full rounded-xl object-cover"
              />
            </article>

            <article className="grid grid-cols-2 gap-5">
              <div className="flex flex-col justify-between rounded-xl bg-white p-6">
                <strong className="text-4xl tracking-[-.06em]">45k+</strong>
                <div>
                  <h3 className="text-sm font-semibold">Happy readers</h3>
                  <p className="mt-2 text-[10px] leading-4 text-black/45">
                    People learning from our resources and community.
                  </p>
                </div>
              </div>
              <div className="relative flex min-h-[270px] items-center justify-center overflow-hidden rounded-xl bg-[#f3f0e9]">
                {[heroPortrait, man, formPic, avatar].map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt=""
                    className="absolute h-20 w-20 rounded-full border-4 border-amber-50 object-cover"
                    style={{
                      left: `${12 + (index % 2) * 42}%`,
                      top: `${10 + Math.floor(index / 2) * 43}%`,
                    }}
                  />
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className={`${container} py-24`}>
          <div className="text-center">
            <p className="mb-3 text-[10px] font-semibold tracking-[.1em] text-[#ff6b16] uppercase">
              Find your direction
            </p>
            <h2 className="text-[clamp(38px,5vw,64px)] leading-none font-semibold tracking-[-.06em]">
              Varieties made just for you.
            </h2>
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {["All courses", "Design", "Development", "Product", "Branding"].map(
                (filter, index) => (
                  <button
                    type="button"
                    key={filter}
                    className={`rounded-full px-4 py-2 text-[9px] font-semibold ${index === 0 ? "bg-black text-white" : "border border-black/15"}`}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-4 gap-x-5 gap-y-12 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
            {[...courses, ...courses].map((course, index) => (
              <CourseCard course={course} key={`${course.title}-${index}`} />
            ))}
          </div>
        </section>

        <section className="py-28">
          <div className={`${container} text-center`}>
            <h2 className="text-[clamp(38px,5vw,64px)] font-semibold tracking-[-.06em]">
              Student&apos;s Testimonial
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-4 border-y border-black/10 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
            {testimonials.map((testimonial) => (
              <article
                className="min-h-[250px] border-r border-black/10 p-8 last:border-r-0"
                key={testimonial.name}
              >
                <div className="mb-7 flex gap-0.5 text-[#ff6b16]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={11} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs leading-5 text-black/65">
                  “{testimonial.quote}”
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <img
                    src={avatar}
                    alt=""
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="flex flex-col text-[9px]">
                    <b>{testimonial.name}</b>
                    <small className="text-black/40">{testimonial.role}</small>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${container} relative py-28 text-center`}>
          <div className="absolute inset-x-0 top-1/2 h-px bg-black/10" />
          {[heroPortrait, man, formPic, internshipImage, avatar, mediprep].map(
            (image, index) => (
              <img
                key={image}
                src={image}
                alt=""
                className="absolute h-14 w-14 rounded-lg border-4 border-amber-50 object-cover shadow-sm max-[640px]:hidden"
                style={{
                  left: `${4 + (index % 3) * 43}%`,
                  top: `${12 + Math.floor(index / 3) * 58}%`,
                }}
              />
            ),
          )}
          <div className="relative mx-auto max-w-[620px] bg-amber-50 px-8">
            <Sparkles className="mx-auto mb-5 text-[#ff6b16]" size={22} />
            <h2 className="text-[clamp(38px,5vw,62px)] leading-[.95] font-semibold tracking-[-.06em]">
              Start your learning journey today!
            </h2>
            <p className="mx-auto mt-5 max-w-[420px] text-[10px] leading-4 text-black/45">
              Join an ambitious community, learn by doing, and build work you
              are proud to show.
            </p>
            <a
              href="mailto:contact@novafoundry.org?subject=Internship enrollment"
              className="mt-7 inline-flex items-center gap-10 rounded-md bg-black px-6 py-3 text-[10px] font-semibold text-white"
            >
              Apply for the next cohort <ArrowRight size={14} />
            </a>
          </div>
        </section>

        <section className={`${container} py-28`}>
          <h2 className="mb-12 text-center text-[clamp(38px,5vw,64px)] font-semibold tracking-[-.06em]">
            Frequently asked questions
          </h2>
          <div className="grid grid-cols-2 gap-3 max-[640px]:grid-cols-1">
            {faqs.map(([question, answer], index) => (
              <details
                className="group rounded-lg border border-black/10 bg-white/55"
                key={question}
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between px-5 text-[10px] font-semibold [&::-webkit-details-marker]:hidden">
                  <span>
                    {index + 1}. {question}
                  </span>
                  <Plus
                    className="transition group-open:rotate-45"
                    size={14}
                  />
                </summary>
                <p className="px-5 pb-5 text-[10px] leading-4 text-black/50">
                  {answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between rounded-lg bg-black p-4 pl-6 text-white max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4">
            <div>
              <p className="text-xs font-semibold">Still have questions?</p>
              <p className="mt-1 text-[9px] text-white/50">
                Talk to us about the program, schedule, or the best track for
                you.
              </p>
            </div>
            <a
              href="mailto:contact@novafoundry.org"
              className="flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[9px] font-semibold text-black"
            >
              Get in touch <Check size={12} />
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default EnrolledPage;
