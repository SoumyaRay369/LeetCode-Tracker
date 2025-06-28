

export const MonthSelector = () => {
    return (
        <>
            <div className='flex justify-center mt-2 mb-3'>
                <div className='flex flex-col items-center gap-y-1'>
                    <div className="flex justify-center">
                        Daily Progress
                    </div>
                    <div className='flex flex-row gap-x-1 w-fit overflow-x-auto snap-x snap-mandatory scroll-smooth'>
                        <button className='p-2 bg-amber-300 rounded-md cursor-pointer'>January</button>
                        <button className='p-2 bg-amber-300 rounded-md cursor-pointer'>February</button>
                        <button className='p-2 bg-amber-300 rounded-md cursor-pointer'>March</button>
                        <button className='p-2 bg-amber-300 rounded-md cursor-pointer'>April</button>
                        <button className='p-2 bg-amber-300 rounded-md cursor-pointer'>May</button>
                        <button className='p-2 bg-amber-300 rounded-md cursor-pointer'>June</button>
                        <button className='p-2 bg-amber-300 rounded-md cursor-pointer'>July</button>
                        <button className='p-2 bg-amber-300 rounded-md cursor-pointer'>August</button>
                        <button className='p-2 bg-amber-300 rounded-md cursor-pointer'>September</button>
                        <button className='p-2 bg-amber-300 rounded-md cursor-pointer'>October</button>
                        <button className='p-2 bg-amber-300 rounded-md cursor-pointer'>November</button>
                        <button className='p-2 bg-amber-300 rounded-md cursor-pointer'>December</button>
                    </div>
                </div>
            </div>
        </>
    )
}