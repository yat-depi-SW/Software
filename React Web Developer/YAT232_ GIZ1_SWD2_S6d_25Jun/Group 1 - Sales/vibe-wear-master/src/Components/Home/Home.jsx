import React from "react";
import Star from "../Star/Star";
import "./Home.css";
function Home() {
  return (
    <>
      <div className="bg-hero">
        <div className="container-fluid">
          <div className="row row-hero align-items-center">
            <div className="col-lg-6 col-md-12 flex h-full flex-col items-start justify-center gap-4 p-16 text-left lg:w-1/3">
              <h6 className="text-red font-bold">SUMMER COLLECTION</h6>
              <div className="flex flex-col">
                <h1 className="text-5xl font-medium text-blue-gray-800">
                  Fall - Winter
                </h1>
                <h1 className="text-5xl font-medium text-blue-gray-800">
                  Collections 2023
                </h1>
              </div>
              <p className="fw-300 text-sm font-light text-blue-gray-700">
                A specialist label creating luxury essentials. Ethically crafted
                with an unwavering commitment to exceptional quality.
              </p>
              <button
                className="bg-red w-1/2 select-none rounded-none px-6 py-3 text-center align-middle text-xl font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-mainWhite w-full pb-10 lg:relative lg:h-[150vh]">
        <div className="flex flex-col items-center gap-4 p-3 lg:static lg:h-[150vh] lg:p-0">
          <div className="lg:absolute lg:left-[20vh] lg:top-[50vh] lg:z-10">
            <img src="/banner-2.jpg" alt="" />
          </div>
          <div className="lg:absolute lg:left-[20vh] lg:top-[120vh] lg:z-20">
            <div className="flex w-fit flex-col items-start">
              <h1 className="text-blueGray block font-sans text-5xl font-medium leading-tight tracking-normal antialiased">
                Accessories
              </h1>
              <h4 className="text-blueGray underline">SHOP NOW</h4>
            </div>
          </div>
          <div className="lg:absolute lg:right-[20vh] lg:top-[10vh] lg:z-10">
            <img src="/banner-1.jpg" alt="" />
          </div>
          <div className="lg:absolute lg:left-[80vh] lg:top-[25vh] lg:z-20">
            <div className="flex w-fit flex-col items-start">
              <h1 className="text-blueGray block font-sans text-5xl font-medium leading-tight tracking-normal antialiased">
                Clothing
              </h1>
              <h1 className="text-blueGray block font-sans text-5xl font-medium leading-tight tracking-normal antialiased">
                Collections 2023
              </h1>
              <h4 className="text-blueGray underline">SHOP NOW</h4>
            </div>
          </div>
          <div className="lg:absolute lg:right-[18vh] lg:top-[80vh] lg:z-10">
            <img src="/banner-3.jpg" alt="" />
          </div>
          <div className="lg:absolute lg:left-[95vh] lg:top-[90vh] lg:z-20">
            <div className="flex w-fit flex-col items-start">
              <h2 className="text-blueGray block font-sans text-4xl font-medium leading-[1.3] tracking-normal antialiased">
                Shoes Spring
              </h2>
              <h2 className="text-blueGray block font-sans text-4xl font-medium leading-[1.3] tracking-normal antialiased">
                2023
              </h2>
              <h4 className="text-blueGray underline">SHOP NOW</h4>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-main mt-4 py-3 text-white">
        <h2 className="text-center text-4xl font-semibold">
          Free shipping, 30-day return or refund guarantee
        </h2>
      </div>
      {/*  */}
      <section className="home-cards my-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6 my-3">
              <div className="bg-mainWhite relative mx-auto flex w-60 flex-col rounded-xl bg-clip-border text-gray-700 shadow-md">
                <div className="relative mx-4 mt-4 h-60 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                  <img
                    src="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
                    alt="card-image"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="block font-sans font-medium text-gray-800">
                      John Hardy Wome
                    </p>
                    <p className="block font-sans font-medium text-gray-800">
                      $10
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex flex-col items-center gap-2 font-bold text-blue-gray-500">
                    <div className="flex gap-2">
                      <span className="text-gray-800">4.6</span>
                      <div className="inline-flex items-center">
                        <Star flag={true} />
                        <Star flag={true} />
                        <Star flag={true} />
                        <Star flag={true} />
                        <Star flag={false} />
                      </div>
                    </div>
                    <p className="block font-sans font-medium text-gray-800">
                      Based on 400 Reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 my-3">
              <div className="bg-mainWhite relative mx-auto flex w-60 flex-col rounded-xl bg-clip-border text-gray-700 shadow-md">
                <div className="relative mx-4 mt-4 h-60 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                  <img
                    src="https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
                    alt="card-image"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="block font-sans font-medium text-gray-800">
                      Solid Gold Peti
                    </p>
                    <p className="block font-sans font-medium text-gray-800">
                      $20
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex flex-col items-center gap-2 font-bold text-blue-gray-500">
                    <div className="flex gap-2">
                      <span className="text-gray-800">3.9</span>
                      <div className="inline-flex items-center">
                        <Star flag={true} />
                        <Star flag={true} />
                        <Star flag={true} />
                        <Star flag={false} />
                        <Star flag={false} />
                      </div>
                    </div>
                    <p className="block font-sans font-medium text-gray-800">
                      Based on 70 Reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 my-3">
              <div className="bg-mainWhite relative mx-auto flex w-60 flex-col rounded-xl bg-clip-border text-gray-700 shadow-md">
                <div className="relative mx-4 mt-4 h-60 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                  <img
                    src="https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
                    alt="card-image"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="block font-sans font-medium text-gray-800">
                      White Gold Plat
                    </p>
                    <p className="block font-sans font-medium text-gray-800">
                      $500
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex flex-col items-center gap-2 font-bold text-blue-gray-500">
                    <div className="flex gap-2">
                      <span className="text-gray-800">3</span>
                      <div className="inline-flex items-center">
                        <Star flag={true} />
                        <Star flag={true} />
                        <Star flag={true} />
                        <Star flag={false} />
                        <Star flag={false} />
                      </div>
                    </div>
                    <p className="block font-sans font-medium text-gray-800">
                      Based on 400 Reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 my-3">
              <div className="bg-mainWhite relative mx-auto flex w-60 flex-col rounded-xl bg-clip-border text-gray-700 shadow-md">
                <div className="relative mx-4 mt-4 h-60 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                  <img
                    src="https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg"
                    alt="card-image"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="block font-sans font-medium text-gray-800">
                      Pierced Owl Ros
                    </p>
                    <p className="block font-sans font-medium text-gray-800">
                      $10.99
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex flex-col items-center gap-2 font-bold text-blue-gray-500">
                    <div className="flex gap-2">
                      <span className="text-gray-800">1.9</span>
                      <div className="inline-flex items-center">
                        <Star flag={true} />
                        <Star flag={false} />
                        <Star flag={false} />
                        <Star flag={false} />
                        <Star flag={false} />
                      </div>
                    </div>
                    <p className="block font-sans font-medium text-gray-800">
                      Based on 100 Reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Home;
