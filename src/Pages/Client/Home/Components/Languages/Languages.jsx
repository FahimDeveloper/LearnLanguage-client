import Marquee from "react-fast-marquee";

const Languages = ({ countries }) => {
    return (
        <div className="container mx-auto py-5 space-y-10">
            <h2 className='titleStyle'>We provide languages</h2>
            <Marquee speed={70}>
                {
                    countries.map((country, index) => {
                        return (
                            <div key={index} className="text-center mx-3">
                                <img src={country.flag} className="h-24 w-40 object-cover border" alt="" />
                                <p className="font-semibold">{country.name}</p>
                            </div>
                        )
                    })
                }
            </Marquee>
        </div >
    );
};

export default Languages;