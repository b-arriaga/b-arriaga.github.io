import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { 
  Tag, 
  Zap, 
  ArrowRight, 
  Download, 
  Mail,
  Book,
  ArrowLeft,
  Info,
  Layers,
  Search,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

// --- Constants & Types ---

type ProjectStatus = "Out of Stock" | "Inventor in Residence" | "Continually Iterating";

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  brief: string;
  solution: string;
  tags: string[];
  color: string;
  role: string;
  status: ProjectStatus;
  specs: Record<string, string>;
  images: string[];
}

interface ZinePage {
  layout: 'cover' | 'standard' | 'opportunity';
  title?: string;
  subtitle?: string;
  bodyTop?: string;
  bodyCols?: string[];
  sidePanel?: string[];
  images?: string[];
}

interface Zine {
  id: number;
  title: string;
  color: string;
  pages: ZinePage[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "bitsy-rats",
    title: "Bitsy Rats",
    subtitle: "Brand Building and Content Strategy",
    description: "Orchestrating a multi-channel brand launch for character-driven collectibles. Focused on world building, the unboxing experience, and character-centric storytelling.",
    longDescription: "Bitsy Rats was an exercise in building a miniatures brand with maximum personality. The Bitsy Rat character, buyer community, and unboxing moment create attachment and collectability. Numerous prototype rounds helped develop recognizable forms, standardized scale, and cohesive visuals. Packaging concepts were devloped alongside the product to create an intentional reveal moment. The result is character-led collectibles that can scale through new themes, sizes, materials and formats. In recent developments, a puppet version of the Bitsy Rat serves as the face of the Bitsy Friends Studio brand and helps deliver more of the content pillars of the brand such as creative confidence, maker education, and studio safety.",
    brief: "Develop a cohesive brand identity and multi-platform content strategy for a new line of miniature character collectibles aimed at trinket lovers and creatives.",
    solution: "A character-first approach using puppets, miniatures, storytelling, and high-frequency community engagement that turned customers into loyal fans.",
    tags: ["Content Strategy", "Toy Design","Character Development","Prototyping","Packaging"],
    color: "#ff4791",
    role: "Brand Owner",
    status: "Out of Stock",
    specs: {
      "Launched": "Dec. 2024",
      "Audience": "Blind Box Collectors",
      "Format": "Physical Product, Social Media Content",
      "Tools": "Adobe, Autodesk, Laser Cutter, 3D Printer, Clay, Foam"
    },
    images: [
      "https://picsum.photos/seed/bitsy1/1200/800",
      "https://picsum.photos/seed/bitsy2/1200/800",
      "https://picsum.photos/seed/bitsy3/1200/800",
      "https://picsum.photos/seed/bitsy4/1200/800"
    ]
  },
  {
    id: "urban-txt",
    title: "Urban TXT",
    subtitle: "Maker Culture and Inventor Support",
    description: "Building an accessible, welcoming makerspace environment and programming for South Central LA students. Mentoring youth teams on their inventions and supporting their product development and investor pitches.",
    longDescription: "At Urban TXT, the mission was to democratize the tools of invention. This meant transforming a former bookstore into a learning lab that local teens would feel confident enough to utilize. Tool selection, space design, and programming in the space were approached from a user-first perspective and by balancing operations and culture, we created safety and structure while still nuturing creativity and experimentation. In the first summer after the space opened, 60 high school teens entered the Summer Coding Leadership Academy and the students were able to use the makerspace to support their projects. The space's flexible design allowed for it to be used as a workshop space, a classroom, drop-in tech support, and meeting space for the student teams to work out their solutions together.",
    brief: "Scale a youth-focused makerspace and design a curriculum that empowers underrepresented teens to explore engineering, coding, and hands-on making through experimentation.",
    solution: "A drop-in makerspace with flexible space arrangements to support various styles of learning and project types.",
    tags: ["Makerspace", "Management","Space Design", "Creative Confidence","Inventor Support"],
    color: "#ff4791",
    role: "Program Director",
    status: "Inventor in Residence",
    specs: {
      "Location": "2318 South Union Ave. Los Angeles, CA.",
      "Cohort Size": "60+ Students",
      "Tools": "React Native, Agile/Lean Development, 3D Printing",
      "Focus": "Makerspace Innovation & Youth Development"
    },
    images: [
      "https://picsum.photos/seed/urban1/1200/800",
      "https://picsum.photos/seed/urban2/1200/800",
      "https://picsum.photos/seed/urban3/1200/800",
      "https://picsum.photos/seed/urban4/1200/800"
    ]
  },
  {
    id: "play-mechanisms",
    title: "Play Mechanisms",
    subtitle: "Rapid Prototyping & Design Engineering",
    description: "A mechanism-driven exploration of feedback loops through two prototype product both aimed at created tactile experiences but for very different audiences.",
    longDescription: "These prototypes study what makes a product feel alive and playful though physical motion and interactive features. Petal Planet investigated how a simple movement like a wobble could delight users and create moments of pause or reflection. The dog toy explores how patterned interactions with light cues and rewards could create a feedback loop to keep dogs interested in the toy for longer. Both concepts were approached as systems where a cue would prompt the user to interact with the product on a repeatable basis. After the user experience was defined, form was developed through several rapid prototyping techniques like laser cutting, 3D printing, and hand sculpting. ",
    brief: "Developing two separate products one for the kidult market and another for dog owners. Both products involved several round of iterations with instructors, stakeholders, and community surveys.",
    solution: "Both products reached a working prototype status and were pitched to peers and stakeholders. The developed mechanisms, branding, and pitches helped support the products in acheiving their goals of captivating their users. ",
    tags: ["Design Engineering", "Prototyping", "Packaging", "Toy Design", "Branding"],
    color: "#ff4791",
    role: "Design Engineer",
    status: "Continually Iterating",
    specs: {
      "Tools": "Autodesk, Arduino, Adobe, Solidworks",
      "Materials": "PLA filament, LEDs, Clay",
      "Output": "2 Functional Prototypes, Sizzle Videos, Pitch Decks",
      "Category": "Interactive Products"
    },
    images: [
      "https://picsum.photos/seed/play1/1200/800",
      "https://picsum.photos/seed/play2/1200/800",
      "https://picsum.photos/seed/play3/1200/800",
      "https://picsum.photos/seed/play4/1200/800"
    ]
  }
];

const ZINES: Zine[] = [
  { 
    id: 1, 
    title: "Discovery of Third Spaces", 
    color: "#ff4791",
    pages: [
      {
        layout: 'cover',
        title: "HOW CAN WE CENTRALIZE THE DISCOVERY OF THIRD SPACES?",
        subtitle: "VOL. 1",
        bodyTop: "THE PROBLEM",
        bodyCols: [
          "Here is where a main problem or concept will go. There is about room for seventeen words.",
          "Body copy about the issue this is lots of body copy about the project and what its all about! This is about twenty six words long.",
          "Body copy about the issue this is lots of body copy about the project and what its all about! This is about twenty six words long."
        ],
        images: ["https://raw.githubusercontent.com/ai-can-help/images/main/third-spaces-cup.png"]
      },
      {
        layout: 'standard',
        title: "THE EXPERIMENT",
        bodyTop: "Body copy about the issue this is lots of body copy about the project and what its all about! This area is a little over thirty three words long. Seriously, it",
        bodyCols: [
          "Copy about the issue this is of copy about the project and what its about! This is about twenty one words"
        ],
        sidePanel: [
          "Side panel copy about the project perhaps cool tales about the works. There is room for just about twenty words.",
          "Side panel copy about the project perhaps cool tales about the works. There is room for just about twenty words."
        ],
        images: ["pink", "pink", "pink"] // Representation of pink blocks
      },
      {
        layout: 'standard',
        title: "THE INSIGHT",
        bodyTop: "Copy about the issue this is lots of copy about the project and what its about! This is about thirty two words long. Here are those last few words hot n ready.",
        bodyCols: [
          "Copy about the issue this is lots of copy about the project and what its about! This is about twenty three words long."
        ],
        sidePanel: [
          "Side panel copy about the project and the insights. There is room for just about eighteen words."
        ],
        images: ["pink", "pink", "pink"]
      },
      {
        layout: 'opportunity',
        title: "THE OPPORTUNITY",
        bodyTop: "This is the space for the insights and future opportunities that came out of this project. I estimate there’s about enough space here for a longer paragraph that beautifully summarizes the process and how this can go even further in about fifty four words or even less! What a great space.",
        bodyCols: [
          "Any final copy about the issue this is lots of copy about the project and what its about! This is about twenty final words long.",
          "Body copy about the issue this is lots of body copy",
          "Body copy about the issue this is lots of body copy"
        ]
      }
    ]
  },
  { id: 2, title: "The Inventor Paradox", color: "#ff4791", pages: [] },
  { id: 3, title: "Shelf Life Vol. 1", color: "#ff4791", pages: [] },
  { id: 4, title: "Brutal Toymaking", color: "#ff4791", pages: [] },
  { id: 5, title: "Mechanism Alpha", color: "#ff4791", pages: [] },
  { id: 6, title: "Toxic Play", color: "#ff4791", pages: [] },
  { id: 7, title: "Plastic Soul", color: "#ff4791", pages: [] },
  { id: 8, title: "Future Retro", color: "#ff4791", pages: [] },
  { id: 9, title: "The Lab Files", color: "#ff4791", pages: [] },
  { id: 10, title: "Pink Print", color: "#ff4791", pages: [] },
];

// --- Sub-components ---

const PaperOverlay: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none opacity-10 mix-blend-multiply z-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" aria-hidden="true" />
);

const CaseStudyCard: React.FC<{ study: CaseStudy, index: number, onOpen: (id: string) => void }> = ({ study, index, onOpen }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.article 
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative group cursor-pointer"
      onClick={() => onOpen(study.id)}
    >
      <div className="absolute -top-6 left-0 h-6 w-32 bg-[#1A1A1A] text-white text-[10px] flex items-center justify-center font-mono-bold uppercase tracking-widest px-2 group-hover:bg-[#ff4791] transition-colors" aria-hidden="true">
        FILE NO. 00{index + 1}
      </div>
      
      <div className="border-2 border-[#1A1A1A] p-6 bg-white min-h-[450px] flex flex-col justify-between riso-border hover:-translate-y-2 focus-within:-translate-y-2 transition-transform duration-300">
        <div className="border-b-2 border-[#1A1A1A] border-dashed pb-4 mb-4">
          <div className="flex justify-between items-start">
            <h3 className="font-massive text-5xl leading-none uppercase mb-2 group-hover:text-[#ff4791] transition-colors text-[#1A1A1A]">
              {study.title}
            </h3>
            <Tag size={20} aria-hidden="true" />
          </div>
          <p className="font-mono-bold text-xs uppercase tracking-tighter text-gray-500">
            {study.subtitle}
          </p>
        </div>

        <div className="flex-grow py-4">
          <p className="font-mono-bold text-sm leading-relaxed mb-6">
            {study.description}
          </p>
          <ul className="flex flex-wrap gap-2">
            {study.tags.map(tag => (
              <li key={tag} className="text-[10px] font-mono-bold border border-[#1A1A1A] px-2 py-0.5 uppercase bg-[#ff4791] text-white">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t-2 border-[#1A1A1A] flex justify-between items-end">
          <div className="text-[10px] font-mono-bold uppercase leading-tight">
            ROLE: {study.role}<br />
            STATUS: {study.status}
          </div>
          <motion.div whileHover={{ x: 5 }} aria-hidden="true">
            <ArrowRight size={24} className="group-hover:text-[#ff4791] transition-colors" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

const ZineCover: React.FC<{ zine: Zine, onOpen: (id: number) => void }> = ({ zine, onOpen }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div 
      whileHover={shouldReduceMotion ? {} : { 
        scale: 1.1, 
        rotate: -5,
        zIndex: 10,
        boxShadow: "10px 10px 0px #ff4791"
      }}
      onClick={() => onOpen(zine.id)}
      className="flex-shrink-0 w-48 h-64 border-2 border-[#1A1A1A] relative cursor-pointer m-4 bg-white overflow-hidden shadow-lg transition-all"
      role="button"
      tabIndex={0}
      aria-label={`View Research Zine: ${zine.title}`}
    >
      <div className="absolute inset-0 opacity-40" style={{ backgroundColor: zine.color }} />
      <div className="absolute inset-0 brutal-grid opacity-10" />
      
      <div className="p-4 h-full flex flex-col justify-between">
        <div className="text-[10px] font-mono-bold border-b border-[#1A1A1A] pb-1 uppercase text-[#1A1A1A]">
          Issue #0{zine.id}
        </div>
        <h4 className="font-massive text-3xl leading-none text-center transform -rotate-6 group-hover:rotate-0 transition-transform text-[#1A1A1A]">
          {zine.title}
        </h4>
        <div className="flex justify-between items-end">
          <Book size={16} className="text-[#1A1A1A]" />
          <div className="text-[8px] font-mono-bold uppercase text-[#1A1A1A]">Research Dir.</div>
        </div>
      </div>
    </motion.div>
  );
};

const ZineViewer: React.FC<{ zine: Zine, onClose: () => void }> = ({ zine, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto no-scrollbar paper-texture"
    >
      {/* Viewer Controls */}
      <div className="fixed top-6 right-6 z-[110] flex gap-4">
        <button 
          onClick={onClose}
          className="bg-[#1A1A1A] text-white p-3 hover:bg-[#ff4791] transition-colors riso-border"
          aria-label="Close Zine"
        >
          <X size={24} />
        </button>
      </div>

      <div className="min-h-screen flex flex-col items-center py-20 px-4 md:px-12">
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
              className="bg-white border-4 border-[#1A1A1A] riso-border min-h-[85vh] shadow-2xl overflow-hidden"
            >
              {zine.pages[currentPage]?.layout === 'cover' && (
                <div className="flex flex-col md:flex-row h-full min-h-[85vh]">
                  <div className="w-full md:w-5/12 bg-[#ff4791] p-12 flex flex-col justify-between border-r-4 border-[#1A1A1A]">
                    <h1 className="font-massive text-7xl md:text-8xl text-[#1A1A1A] leading-tight uppercase">
                      {zine.pages[currentPage].title}
                    </h1>
                    <div className="space-y-4">
                      <div className="font-mono-bold text-4xl text-[#1A1A1A]">{zine.pages[currentPage].subtitle}</div>
                      <div className="font-mono-bold text-lg text-[#1A1A1A]">BELLISSIMA ARRIAGA-PATTILLO</div>
                    </div>
                  </div>
                  <div className="w-full md:w-7/12 p-12 bg-white flex flex-col">
                    <div className="mb-12">
                       <span className="bg-[#ff4791] text-[#1A1A1A] font-massive text-6xl px-2 uppercase leading-none inline-block">THE PROBLEM</span>
                    </div>
                    <p className="font-mono-bold text-2xl mb-12 text-[#1A1A1A]">{zine.pages[currentPage].bodyCols?.[0]}</p>
                    <div className="grid grid-cols-2 gap-8 mb-12">
                      <p className="font-mono-bold text-base text-[#1A1A1A]">{zine.pages[currentPage].bodyCols?.[1]}</p>
                      <p className="font-mono-bold text-base text-[#1A1A1A]">{zine.pages[currentPage].bodyCols?.[2]}</p>
                    </div>
                    <div className="mt-auto flex justify-center opacity-30">
                       <img src="https://raw.githubusercontent.com/ai-can-help/images/main/third-spaces-cup.png" alt="Cup illustration" className="w-64 grayscale mix-blend-multiply" />
                    </div>
                  </div>
                </div>
              )}

              {zine.pages[currentPage]?.layout === 'standard' && (
                <div className="flex flex-col md:flex-row h-full min-h-[85vh]">
                  <div className="flex-1 p-12 bg-white relative">
                    <header className="mb-12">
                       <span className="bg-[#ff4791] text-[#1A1A1A] font-massive text-6xl px-2 uppercase leading-none inline-block">{zine.pages[currentPage].title}</span>
                    </header>
                    <p className="font-mono-bold text-xl mb-12 text-[#1A1A1A]">{zine.pages[currentPage].bodyTop}</p>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-12">
                          <p className="font-mono-bold text-base text-[#1A1A1A]">{zine.pages[currentPage].bodyCols?.[0]}</p>
                          <div className="w-48 h-48 bg-[#ff4791] riso-border" />
                          <div className="font-mono-bold text-xs uppercase text-[#1A1A1A]">Just enough space here for seven words</div>
                       </div>
                       <div className="space-y-12 pt-24">
                          <div className="w-full h-64 bg-[#ff4791] riso-border" />
                          <div className="font-mono-bold text-xs uppercase text-[#1A1A1A]">Just enough space here for seven words</div>
                       </div>
                    </div>
                  </div>
                  <div className="w-full md:w-3/12 bg-[#ff4791]/30 p-12 border-l-4 border-[#1A1A1A] space-y-24">
                    {zine.pages[currentPage].sidePanel?.map((p, i) => (
                      <p key={i} className="font-mono-bold text-base text-[#1A1A1A]">{p}</p>
                    ))}
                  </div>
                </div>
              )}

              {zine.pages[currentPage]?.layout === 'opportunity' && (
                <div className="flex flex-col md:flex-row h-full min-h-[85vh]">
                   <div className="w-full md:w-7/12 p-12 bg-white">
                      <header className="mb-12">
                        <span className="bg-[#ff4791] text-[#1A1A1A] font-massive text-6xl px-2 uppercase leading-none inline-block">{zine.pages[currentPage].title}</span>
                      </header>
                      <p className="font-mono-bold text-2xl mb-12 text-[#1A1A1A]">{zine.pages[currentPage].bodyTop}</p>
                      <div className="bg-[#ff4791]/50 p-6 border-2 border-[#1A1A1A] riso-border">
                        <p className="font-mono-bold text-base text-[#1A1A1A]">{zine.pages[currentPage].bodyCols?.[0]}</p>
                      </div>
                   </div>
                   <div className="flex-1 bg-[#ff4791]/40 p-12 border-l-4 border-[#1A1A1A] flex flex-col justify-between">
                      <p className="font-mono-bold text-base text-[#1A1A1A]">{zine.pages[currentPage].bodyCols?.[1]}</p>
                      <p className="font-mono-bold text-base text-[#1A1A1A]">{zine.pages[currentPage].bodyCols?.[2]}</p>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          <div className="mt-12 flex justify-between items-center bg-[#1A1A1A] p-6 riso-border text-white">
            <button 
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              className="flex items-center gap-2 font-mono-bold uppercase text-xs hover:text-[#ff4791] disabled:opacity-20 transition-colors"
            >
              <ChevronLeft size={20} /> Prev Page
            </button>
            <div className="font-massive text-3xl tracking-widest">
              PAGE {currentPage + 1} / {zine.pages.length}
            </div>
            <button 
              disabled={currentPage === zine.pages.length - 1}
              onClick={() => setCurrentPage(p => Math.min(zine.pages.length - 1, p + 1))}
              className="flex items-center gap-2 font-mono-bold uppercase text-xs hover:text-[#ff4791] disabled:opacity-20 transition-colors"
            >
              Next Page <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ArchivalCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative group">
      <div className="aspect-video border-4 border-[#1A1A1A] riso-border relative overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          <motion.img 
            key={index}
            src={images[index]} 
            alt={`Project Image ${index + 1}`} 
            initial={shouldReduceMotion ? { opacity: 0 } : { x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full object-cover grayscale mix-blend-multiply transition-all group-hover:grayscale-0" 
          />
        </AnimatePresence>

        <div className="absolute bottom-0 right-0 flex border-t-4 border-l-4 border-[#1A1A1A] bg-white">
          <button onClick={prev} className="p-4 hover:bg-[#ff4791] hover:text-white transition-colors border-r-4 border-[#1A1A1A]" aria-label="Previous Slide">
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center justify-center px-6 font-mono-bold text-sm tracking-tighter text-[#1A1A1A]">
            SLIDE_0{index + 1} // 0{images.length}
          </div>
          <button onClick={next} className="p-4 hover:bg-[#ff4791] hover:text-white transition-colors border-l-4 border-[#1A1A1A]" aria-label="Next Slide">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <div className="absolute -left-3 top-0 bottom-0 flex flex-col justify-around py-4 opacity-10 pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-[#1A1A1A] rounded-full" />
        ))}
      </div>
    </div>
  );
};

const CaseStudyDetail: React.FC<{ study: CaseStudy, onClose: () => void }> = ({ study, onClose }) => {
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div 
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -100 }}
      className="min-h-screen bg-[#F5F5F5] paper-texture relative z-50 pt-24 pb-32"
    >
      <div className="max-w-7xl mx-auto px-8">
        <button onClick={onClose} className="group flex items-center gap-4 mb-16 font-mono-bold text-sm uppercase border-b-2 border-[#1A1A1A] pb-2 hover:text-[#ff4791] hover:border-[#ff4791] transition-all">
          <ArrowLeft size={18} /> Return to Case Studies
        </button>
        <header className="mb-24 border-b-4 border-[#1A1A1A] pb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-4xl">
              <h1 className="font-massive text-[12vw] md:text-[10vw] uppercase leading-none riso-text mb-4 text-[#1A1A1A]">{study.title}</h1>
              <p className="font-mono-bold text-xl uppercase tracking-widest opacity-60">{study.subtitle}</p>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-24">
            <section>
              <h2 className="font-massive text-4xl uppercase mb-8 border-l-8 border-[#ff4791] pl-4 text-[#1A1A1A]">The Summary</h2>
              <p className="font-mono-bold text-2xl leading-snug mb-12 text-[#1A1A1A]">{study.longDescription}</p>
              <ArchivalCarousel images={study.images} />
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section className="border-2 border-[#1A1A1A] p-8 bg-white riso-border">
                <div className="flex items-center gap-3 mb-4 text-[#ff4791]">
                  <Search size={24} /><h3 className="font-massive text-2xl uppercase">The Brief</h3>
                </div>
                <p className="font-mono-bold text-sm leading-relaxed text-[#1A1A1A]">{study.brief}</p>
              </section>
              <section className="border-2 border-[#1A1A1A] p-8 bg-white riso-border">
                <div className="flex items-center gap-3 mb-4 text-[#ff4791]">
                  <Layers size={24} /><h3 className="font-massive text-2xl uppercase">The Solution</h3>
                </div>
                <p className="font-mono-bold text-sm leading-relaxed text-[#1A1A1A]">{study.solution}</p>
              </section>
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="bg-[#1A1A1A] text-white p-8 riso-border">
                <h3 className="font-massive text-3xl uppercase mb-6 text-[#ff4791]">Project Specs</h3>
                <dl className="space-y-6">
                  {Object.entries(study.specs).map(([key, val]) => (
                    <div key={key} className="border-b border-white/20 pb-4">
                      <dt className="text-[10px] font-mono-bold uppercase opacity-50 mb-1">{key}</dt>
                      <dd className="font-mono-bold text-sm uppercase">{val}</dd>
                    </div>
                  ))}
                  <div className="pt-4">
                    <dt className="text-[10px] font-mono-bold uppercase opacity-50 mb-2">Role</dt>
                    <dd className="bg-[#ff4791] text-white px-2 py-1 inline-block font-mono-bold text-xs uppercase">{study.role}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'detail' | 'zine'>('home');
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);
  const [activeZine, setActiveZine] = useState<Zine | null>(null);
  
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const openStudy = (id: string) => {
    const study = CASE_STUDIES.find(s => s.id === id);
    if (study) {
      setActiveStudy(study);
      setView('detail');
    }
  };

  const openZine = (id: number) => {
    const zine = ZINES.find(z => z.id === id);
    if (zine) {
      setActiveZine(zine);
      setView('zine');
    }
  };

  return (
    <div className="relative selection:bg-[#ff4791] selection:text-white">
      <PaperOverlay />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="home-view">
            <header className="fixed top-0 left-0 w-full z-40 p-6 flex justify-between items-center mix-blend-difference pointer-events-none">
              <div className="font-mono-bold text-sm uppercase pointer-events-auto text-[#1A1A1A]">[ 2026 PORTFOLIO ]</div>
              <nav className="flex gap-8 font-mono-bold text-sm uppercase pointer-events-auto" aria-label="Main Navigation">
                <a href="#work" className="hover:text-[#ff4791] transition-colors underline decoration-wavy text-[#1A1A1A]">Works</a>
                <a href="#research" className="hover:text-[#ff4791] transition-colors underline decoration-wavy text-[#1A1A1A]">Research</a>
                <a href="#about" className="hover:text-[#ff4791] transition-colors underline decoration-wavy text-[#1A1A1A]">Contact</a>
              </nav>
            </header>
            <main id="main-content">
              <section className="h-screen relative flex items-center justify-center overflow-hidden border-b-4 border-[#1A1A1A]">
                <div className="absolute inset-0 bg-[#F5F5F5] z-0" aria-hidden="true">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 mix-blend-multiply filter grayscale">
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-fast-geometric-shapes-and-lines-20338-large.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 brutal-grid opacity-20" />
                </div>
                <motion.div style={{ y: shouldReduceMotion ? 0 : heroY }} className="relative z-10 w-full max-w-7xl px-8 flex flex-col md:flex-row items-end justify-between">
                  <div className="text-left w-full">
                    <motion.h1 initial={shouldReduceMotion ? { opacity: 1 } : { x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="font-massive text-[12vw] md:text-[14vw] uppercase leading-[0.8] mb-8 riso-text text-[#1A1A1A]">Bellissima<br />Arriaga-Pattillo</motion.h1>
                    <motion.div initial={shouldReduceMotion ? { opacity: 1 } : { y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="flex flex-col md:flex-row items-start md:items-end gap-6">
                      <div className="bg-[#1A1A1A] text-white p-4 max-w-lg">
                        <p className="font-mono-bold text-lg md:text-xl leading-tight uppercase">Turning playful ideas<br />into pitch-ready concepts.</p>
                      </div>
                      <div className="font-mono-bold text-xs uppercase max-w-[400px] text-[#1A1A1A]">inventor / product designer / fabricator / opportunity maker</div>
                    </motion.div>
                  </div>
                </motion.div>
              </section>
              <section id="work" className="py-32 px-8 max-w-7xl mx-auto relative">
                <div className="absolute top-0 right-8 -translate-y-1/2 hidden lg:block"><Zap size={100} strokeWidth={1} className="text-[#ff4791] opacity-20" /></div>
                <div className="mb-24"><h2 className="font-massive text-9xl uppercase leading-none text-[#1A1A1A]">Case Studies</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8">
                  {CASE_STUDIES.map((study, idx) => (
                    <CaseStudyCard key={study.id} study={study} index={idx} onOpen={openStudy} />
                  ))}
                </div>
              </section>
              <section id="research" className="bg-[#1A1A1A] py-32 overflow-hidden border-y-4 border-[#1A1A1A] text-[#F5F5F5]">
                <div className="max-w-7xl mx-auto px-8 mb-12">
                  <h2 className="font-massive text-9xl uppercase leading-none text-[#ff4791]">Research</h2>
                  <p className="font-mono-bold text-sm uppercase mt-4 text-[#ff4791]">The Zine Library: Ethnography of play & industrial insights</p>
                </div>
                <div className="relative pb-12">
                  <motion.div className="flex gap-4 overflow-x-auto pb-8 px-8 no-scrollbar" animate={shouldReduceMotion ? {} : { x: [0, -100, 0] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                    {ZINES.slice(0, 5).map(zine => <ZineCover key={zine.id} zine={zine} onOpen={openZine} />)}
                    {ZINES.slice(0, 5).map(zine => <ZineCover key={`dup1-${zine.id}`} zine={zine} onOpen={openZine} />)}
                  </motion.div>
                  <div className="h-2 w-full bg-[#ff4791] mx-8 opacity-20" />
                </div>
              </section>
              <section id="about" className="min-h-screen flex flex-col md:flex-row relative">
                <div className="w-full md:w-1/2 bg-[#F5F5F5] relative flex items-center justify-center overflow-hidden border-r-4 border-[#1A1A1A]">
                  <motion.div animate={shouldReduceMotion ? {} : { rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute w-[130%] h-[130%] bg-gradient-to-br from-[#ff4791] via-[#ff4791]/10 to-transparent opacity-30 rounded-full blur-[100px]" />
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-12">
                    <div className="relative w-full max-w-md aspect-[9/16] bg-white border-4 border-[#1A1A1A] riso-border group overflow-hidden">
                      <img src="https://raw.githubusercontent.com/ai-can-help/images/main/bellissima_arriaga_bluey.jpg" alt="Bellissima Arriaga-Pattillo with Bluey" className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                      <div className="absolute -bottom-4 -right-4 bg-[#1A1A1A] text-white p-2 font-mono-bold text-[10px] uppercase z-20">Subject: Arriaga-Pattillo, B. [RELATIONS MGR]</div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-[#F5F5F5]">
                  <div className="max-w-xl">
                    <h2 className="font-massive text-7xl md:text-9xl uppercase mb-8 leading-none text-[#1A1A1A]">Designing play<br />you can hold</h2>
                    <div className="space-y-6 font-mono-bold text-base md:text-lg leading-snug text-[#1A1A1A]">
                      <p>Bellissima Arriaga-Pattillo is a multidisciplinary product and experience designer focused on breakthrough play concepts.</p>
                      <p>With a background in maker culture and operations, she speaks the language of both the designers and the executives.</p>
                    </div>
                    <div className="mt-12 flex flex-col sm:flex-row gap-6">
                      <button className="relative flex-1 group" onClick={() => window.alert('Archival Download Initiated')}><div className="absolute inset-0 bg-[#ff4791] translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" /><div className="relative border-2 border-[#1A1A1A] bg-[#1A1A1A] p-4 flex items-center justify-center gap-2 text-white font-mono-bold uppercase tracking-widest text-sm transition-colors group-hover:bg-[#ff4791]"><Download size={18} /> Download Resume</div></button>
                      <button className="relative flex-1 group" onClick={() => window.location.href = 'mailto:hello@example.com'}><div className="absolute inset-0 bg-[#1A1A1A] translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" /><div className="relative border-2 border-[#1A1A1A] bg-[#ff4791] p-4 flex items-center justify-center gap-2 text-white font-mono-bold uppercase tracking-widest text-sm transition-colors group-hover:bg-[#1A1A1A]"><Mail size={18} /> Let's Connect</div></button>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </motion.div>
        )}
        {view === 'detail' && (
          <CaseStudyDetail key="detail" study={activeStudy!} onClose={() => setView('home')} />
        )}
        {view === 'zine' && (
          <ZineViewer key="zine" zine={activeZine!} onClose={() => setView('home')} />
        )}
      </AnimatePresence>

      <footer className="bg-[#1A1A1A] text-white py-4 px-8 overflow-hidden relative z-40">
        <div className="flex gap-16 animate-marquee whitespace-nowrap font-mono-bold text-[10px] uppercase tracking-[0.3em]">
          <span>product designer</span><span>•</span>
          <span>inventor</span><span>•</span>
          <span>rapid prototyping expert</span><span>•</span>
          <span>academic researcher</span><span>•</span>
          <span>brand strategist</span><span>•</span>
          <span>public speaker</span><span>•</span>
          <span>creative technologist</span><span>•</span>
          <span>user experience architect</span><span>•</span>
          <span>hands-on fabricator</span><span>•</span>
          <span>maker culture advocate</span><span>•</span>
          <span>Bellissima Arriaga-Pattillo</span>
          <span>•</span>
          <span>product designer</span><span>•</span>
          <span>inventor</span><span>•</span>
          <span>rapid prototyping expert</span><span>•</span>
          <span>academic researcher</span><span>•</span>
          <span>brand strategist</span><span>•</span>
          <span>public speaker</span><span>•</span>
          <span>creative technologist</span><span>•</span>
          <span>user experience architect</span><span>•</span>
          <span>hands-on fabricator</span><span>•</span>
          <span>maker culture advocate</span><span>•</span>
          <span>Bellissima Arriaga-Pattillo</span>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .animate-marquee { animation: none; } }
      `}</style>
    </div>
  );
}