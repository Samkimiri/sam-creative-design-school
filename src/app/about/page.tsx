export default function About() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Our Story</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-8">
              Empowering Creatives Through <span className="text-primary">Excellence</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              SCDS (Sam Creative Design School) was founded with a single mission: to bridge the gap between academic theory and practical, industry-level creative skills.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We believe that everyone has a creative spark, and with the right tools, mentorship, and practical projects, that spark can be turned into a professional career that pays.
            </p>
            <div className="p-8 bg-dark text-white rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-primary mb-2">Our Mission</h3>
              <p className="text-2xl font-bold italic leading-relaxed">
                “Being Exceptional, Strategic, and Realistic”
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-light-gray rounded-3xl overflow-hidden shadow-2xl">
              {/* Instructor Image Placeholder */}
              <div className="w-full h-full bg-gradient-to-tr from-dark to-gray-800 flex items-center justify-center text-6xl">
                👨‍🏫
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 bg-primary text-white p-8 rounded-2xl shadow-xl hidden md:block">
              <span className="text-5xl font-bold block mb-1">5+</span>
              <span className="text-sm font-medium uppercase tracking-wider">Years of Excellence</span>
            </div>
          </div>
        </div>

        <div className="bg-light-gray rounded-3xl p-12 md:p-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Meet Your Instructor</h2>
            <div className="w-32 h-32 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-white font-bold">
              SK
            </div>
            <h3 className="text-2xl font-bold mb-2">Samuel Kimiri</h3>
            <p className="text-primary font-bold mb-6 uppercase tracking-widest">Graphic Designer | Engineer | Trainer</p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Samuel is a multi-talented professional with a background in both Engineering and Creative Design. With years of experience in industry-level design work and technical engineering projects, he brings a unique perspective to training—focusing on precision, strategy, and real-world application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
