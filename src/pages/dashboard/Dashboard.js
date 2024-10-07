const Dashboard = () => {
  const totalStyle = "w-[32.5%] text-lg border rounded-xl px-5 py-3.5 bg-white";

  return (
    <div className="w-[100%]">
      <div className="flex justify-between mb-5 gap-5">
        <div className={totalStyle}>Total Students</div>
        <div className={totalStyle}>Total Classes</div>
        <div className={totalStyle}>Total Income</div>
      </div>

      <div className="flex justify-between gap-5">
        <div className="flex flex-col w-[68%] gap-5">
          <div className="w-full h-[261px] border rounded-xl px-5 py-3.5 bg-white">
            Graph
          </div>
          <div className="flex w-full gap-5">
            <div className="w-[60%] h-[231px] border rounded-xl px-5 py-3.5 bg-white">
              Performance
            </div>
            <div className="w-[40%] h-[231px] border rounded-xl px-5 py-3.5 pl-4 bg-white">
              Attendance
            </div>
          </div>
        </div>

        <div className="flex flex-col w-[31%] gap-5">
          <div className="h-[345px] border rounded-xl px-5 py-3.5 bg-white">
            Calendar
          </div>
          <div className="h-[147px] border rounded-xl px-5 py-3.5 bg-white">
            Join Session
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
