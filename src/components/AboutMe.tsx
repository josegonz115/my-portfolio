
const AboutMe = () => {
  return (
    <section id="about-me" >
    <h1 className="font-bold text-center md:text-left text-4xl py-5">
        A brief intro about me
    </h1>
    <div className='flex flex-col place-content-center'>
        <p>I'm Jose Juan Gonzalez Jr, a 25-year-old student at UCI studying Software Engineering B.S. with already a background in
        Sociology at UC Berkeley. My journey into programming began late towards my time at Berkeley which started as a small interest
        which quickly grew into an activity that I can't picture going a day without! I'm dedicated to learning both the theoritical
        and practical aspects of software development through through my pursuit in higher education and self studying. 
        </p>
        <p>
        The tech industry moves at a fast pace which requires constant learning! My self-studying journey led me to the agile constantly expanding
        space of web development. I enjoy front-end projects using React but have 
        recently developed a keen interest in backend development, teaching myself to create web servers with Node.js, Express.js, and 
        connecting them to databases like Postgres and MongoDB. 
        </p>
        <p
        className='py-3 font-bold max-w-2xl mt-4'
        >
        I seek to improve myself, learn from myself and others, and become the best programmer version of myself I can be!
        </p>
    </div>
    </section>
  )
}

export default AboutMe