import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

function MobileMenu({ mobileview, setmobileview }) {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const tl = useRef();

  useEffect(() => {
    // Initial state
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([...linksRef.current, contactRef.current], { autoAlpha: 0, x: 20 });

    // Timeline
    tl.current = gsap.timeline({ paused: true })
      // First animate background (nav panel)
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      // Then stagger links one by one
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.1,
          ease: "power2.out",
        },
        ">+0.2"
      )
      // Finally animate the contact section
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.2,
          ease: "power2.out",
        },
        "<+0.2"
      );
  }, []);

  useEffect(() => {
    if (mobileview) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [mobileview]);

  return (
    <div
      ref={navRef}
      className={`absolute min-h-screen top-0 right-0 bg-black/95 rounded-l-sm text-white/80 uppercase z-100 ${
        mobileview ? "w-full md:w-1/2 " : "w-0"
      }`}
    >
      <div className="flex  justify-between flex-col ">
        <div
        onClick={() => setmobileview(false)}
        className="flex items-center text-3xl border-b p-3 gap-4 cursor-pointer"
      >
        <X size={24} /> <p className="font-[font4]">Back</p>
      </div>

      <div className="flex text-right z-11    justify-center  flex-col">
        {["/", "/products", "/about", "/contact", "/career", "/faq",,].map(
          (path, idx) => (
            <NavLink
              key={idx}
              onClick={() => setmobileview(false)}
              to={path}
              className={({ isActive }) =>
                `py-5 pl-6 font-[font1] border-b border-b-gray-50/10 md:text-5xl text-6xl  cursor-pointer ${
                  isActive ? " text-black/80 bg-white/80  font-semibold" : "text-white pr-4 hover:text-black transition-all ease-in duration-300 hover:bg-gray-100/50"
                }`
              }
              ref={(el) => (linksRef.current[idx] = el)}
            >
              {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          )
        )}
     
      </div>


      </div>
   <div
          ref={contactRef}
          className="py-8 pl-6 absolute bottom-0 left-0 cursor-pointer"
          onClick={() => setmobileview(false)}
        >
          <p className="text-2xl font-bold font-[font4]">Contact Us</p>
          <p className="text-lg text-gray-500">info@Fineset.com</p>
          <p className="text-lg text-gray-500">+91 8088915077</p>
        </div>

     

    </div>
  );
}

export default MobileMenu;
