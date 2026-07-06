import {
  ShieldCheck,
  GraduationCap,
  FileText,
  ClipboardCheck,
  BarChart3,
  Award,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-20">

        <div className="text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium">

            <ShieldCheck size={18} />

            Secure Online Assessment Platform

          </div>

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">

            Online

            <span className="text-cyan-400"> Examination </span>

            System

          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-slate-300 text-lg leading-8">

            Conduct secure online examinations with automated evaluation,
            real-time analytics, question management and instant result
            generation through a modern examination platform.

          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <div className="text-3xl font-bold text-cyan-400">
              100%
            </div>

            <p className="mt-2 text-slate-400">
              Secure Login
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <div className="text-3xl font-bold text-green-400">
              Instant
            </div>

            <p className="mt-2 text-slate-400">
              Result Generation
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <div className="text-3xl font-bold text-purple-400">
              Excel
            </div>

            <p className="mt-2 text-slate-400">
              Question Upload
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <div className="text-3xl font-bold text-orange-400">
              Live
            </div>

            <p className="mt-2 text-slate-400">
              Dashboard
            </p>

          </div>

        </div>

        {/* LOGIN CARDS */}

        <div className="grid lg:grid-cols-2 gap-8 mt-16">

          {/* ADMIN */}

          <div className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-10 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2">

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

              <ShieldCheck size={34} className="text-cyan-400" />

            </div>

            <h2 className="text-3xl font-bold mt-6">

              Administrator

            </h2>

            <p className="text-slate-400 mt-4 leading-7">

              Complete control over examinations, question banks,
              students, dashboard analytics and results.

            </p>

            <div className="space-y-4 mt-8">

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-400" size={20}/>
                Manage Exams
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-400" size={20}/>
                Upload Questions
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-400" size={20}/>
                Student Management
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-400" size={20}/>
                Dashboard Analytics
              </div>

            </div>

            <button
              onClick={() => navigate("/admin-login")}
              className="mt-10 w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 font-semibold text-black flex justify-center items-center gap-2 transition-all"
            >
              Login as Administrator

              <ArrowRight size={18}/>
            </button>

          </div>

          {/* STUDENT */}

          <div className="rounded-3xl border border-green-500/20 bg-slate-900 p-10 hover:border-green-400 transition-all duration-300 hover:-translate-y-2">

            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center">

              <GraduationCap
                size={34}
                className="text-green-400"
              />

            </div>

            <h2 className="text-3xl font-bold mt-6">

              Student

            </h2>

            <p className="text-slate-400 mt-4 leading-7">

              Attempt examinations, monitor performance,
              download certificates and view examination history.

            </p>

            <div className="space-y-4 mt-8">

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-400" size={20}/>
                Online Examination
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-400" size={20}/>
                Instant Result
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-400" size={20}/>
                Certificate Download
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-400" size={20}/>
                Progress Tracking
              </div>

            </div>

            <button
              onClick={() => navigate("/student-login")}
              className="mt-10 w-full py-4 rounded-xl bg-green-500 hover:bg-green-400 font-semibold text-black flex justify-center items-center gap-2 transition-all"
            >
              Login as Student

              <ArrowRight size={18}/>
            </button>

          </div>

        </div>

      </section>

      {/* FEATURES START HERE */}
      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold">
            Why Choose Our Platform?
          </h2>

          <p className="text-slate-400 mt-4 text-lg">
            Designed to simplify online examinations with powerful tools
            for administrators and students.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500 transition">

            <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">

              <ShieldCheck className="text-cyan-400" size={30} />

            </div>

            <h3 className="text-2xl font-semibold">
              Secure Authentication
            </h3>

            <p className="text-slate-400 mt-4 leading-7">
              JWT based authentication keeps administrator and student
              accounts protected with role-based authorization.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-green-500 transition">

            <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6">

              <ClipboardCheck className="text-green-400" size={30} />

            </div>

            <h3 className="text-2xl font-semibold">
              Online Examination
            </h3>

            <p className="text-slate-400 mt-4 leading-7">
              Conduct examinations with timers, automatic submission,
              navigation and instant evaluation.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-purple-500 transition">

            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">

              <FileText className="text-purple-400" size={30} />

            </div>

            <h3 className="text-2xl font-semibold">
              Excel Question Upload
            </h3>

            <p className="text-slate-400 mt-4 leading-7">
              Upload hundreds of questions within seconds using Microsoft
              Excel without manual entry.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-orange-500 transition">

            <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6">

              <BarChart3 className="text-orange-400" size={30} />

            </div>

            <h3 className="text-2xl font-semibold">
              Dashboard Analytics
            </h3>

            <p className="text-slate-400 mt-4 leading-7">
              Interactive charts and statistics provide complete
              examination performance insights.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-pink-500 transition">

            <div className="w-14 h-14 rounded-xl bg-pink-500/10 flex items-center justify-center mb-6">

              <Award className="text-pink-400" size={30} />

            </div>

            <h3 className="text-2xl font-semibold">
              Instant Results
            </h3>

            <p className="text-slate-400 mt-4 leading-7">
              Results are generated automatically immediately after
              examination submission.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-yellow-500 transition">

            <div className="w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-6">

              <GraduationCap className="text-yellow-400" size={30} />

            </div>

            <h3 className="text-2xl font-semibold">
              Student Friendly
            </h3>

            <p className="text-slate-400 mt-4 leading-7">
              Clean interface with responsive design for desktop,
              tablet and mobile devices.
            </p>

          </div>

        </div>

      </section>
      
      {/* FOOTER */}

      <footer className="border-t border-slate-800 bg-slate-950">

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

          <div className="grid md:grid-cols-3 gap-10">

            {/* ABOUT */}

            <div>

              <h3 className="text-2xl font-bold">

                Online Examination System

              </h3>

              <p className="text-slate-400 mt-5 leading-7">

                A secure and modern web-based examination platform
                developed using React, Spring Boot and MySQL.
                The system provides online examination,
                question management, automatic evaluation,
                dashboard analytics and instant result generation.

              </p>

            </div>

            {/* FEATURES */}

            <div>

              <h3 className="text-xl font-semibold">

                Features

              </h3>

              <ul className="space-y-3 mt-5 text-slate-400">

                <li>✔ Secure Authentication</li>

                <li>✔ Online Examination</li>

                <li>✔ Excel Question Upload</li>

                <li>✔ Dashboard Analytics</li>

                <li>✔ Automatic Result Generation</li>

                <li>✔ Responsive Design</li>

              </ul>

            </div>

            {/* DEVELOPER */}

            <div>

              <h3 className="text-xl font-semibold">

                Developer

              </h3>

              <div className="mt-5 space-y-3 text-slate-400">

                <p>

                  <span className="text-white font-medium">

                    Vishal Kumar Mahato

                  </span>

                </p>

                <p>B.Tech (Computer Science & Engineering)</p>

                <p>Guru Kashi University</p>

                <p>Industrial Training Project</p>

                <p>Fidest Skills Pvt. Ltd.</p>

              </div>

            </div>

          </div>

          <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-slate-500 text-sm">

              © 2026 Online Examination System.
              All Rights Reserved.

            </p>

            <p className="text-slate-500 text-sm">

              Developed by
              <span className="text-cyan-400 font-semibold">
                {" "}
                Vishal Kumar Mahato
              </span>

            </p>

          </div>

        </div>

      </footer>

    </div>

  );

}