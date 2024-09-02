
const SkillsBar = () => {
  return (
<section id="nav-skills skills"  >
    <h2 className="text-5xl text-center md:text-left font-medium py-5 ">My Skills</h2>
    {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-8/12 mb-auto mx-auto"> */}
    <div className="flex flex-col sm:flex-row gap-4 px-0 md:px-5  mx-auto  w-full">
      <div className=" flex-grow">
        <div>
            <div className="flex justify-between mb-1 ">
                <span className="text-base font-medium ">HTML/CSS</span>
                <span className="text-sm font-medium ">100%</span>
            </div>
            <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{width: "100%"}}></div>
            </div>
        </div>
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium ">JavaScript</span>
                <span className="text-sm font-medium ">100%</span>
            </div>
                <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{width: "100%"}}></div>
            </div>
        </div>
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium ">Python</span>
                <span className="text-sm font-medium ">80%</span>
              </div>
              <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{width: "80%"}}></div>
              </div>
        </div>
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium ">Java</span>
                <span className="text-sm font-medium ">70%</span>
              </div>
              <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "80%"}}></div>
              </div>
        </div>
        </div>
        <div className="flex-grow ">
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium ">SQL(Postgres)</span>
                <span className="text-sm font-medium ">70%</span>
              </div>
              <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "70%"}}></div>
              </div>
        </div>
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium ">React Native</span>
                <span className="text-sm font-medium ">60%</span>
              </div>
              <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "60%"}}></div>
              </div>
        </div>
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium ">C++</span>
                <span className="text-sm font-medium ">70%</span>
              </div>
              <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "70%"}}></div>
              </div>
        </div>
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium ">Go</span>
                <span className="text-sm font-medium ">50%</span>
              </div>
              <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "50%"}}></div>
              </div>
        </div>
        </div>
    </div>
</section>
  )
}

export default SkillsBar;