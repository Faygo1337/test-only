import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../node_modules/swiper/modules/navigation.scss";
import "../../node_modules/swiper/modules//pagination.scss";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "../../node_modules/swiper/swiper.scss";
gsap.registerPlugin(MotionPathPlugin);

const Slider: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const tracker = useRef({ item: 0 });
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 6;
  const labels = [
    "Технологии",
    "Кино",
    "Литература",
    "Театр",
    "Спорт",
    "Наука",
  ];
  const dates = [
    "1980 1986",
    "1987 1991",
    "1992 1997",
    "1999 2004",
    "2006 2014",
    "2015 2022",
  ];
  const slidesData = {
    "1980 1986": [
      "1980: Извержение вулкана Сент-Хеленс, вызвавшее значительные разрушения и гибель людей.",
      "1982: Фолклендская война между Великобританией и Аргентиной.",
      "1983: Появление первых мобильных телефонов.",
      "1986: Чернобыльская авария в Советском Союзе.",
    ],
    "1987 1991": [
      "1987: Крушение фондового рынка, известное как 'Чёрный понедельник'.",
      "1988: Окончание Ирано-иракской войны после восьми лет конфликта.",
      "1990: Освобождение Нельсона Манделы из тюрьмы после 27 лет заключения.",
      "1991: Обнародование Всемирной паутины.",
    ],
    "1992 1997": [
      "1992: Подписание Маастрихтского договора, приведшего к созданию Европейского Союза.",
      "1993: Теракт в Всемирном торговом центре в Нью-Йорке.",
      "1996: Рождение первого клонированного млекопитающего – овцы Долли.",
      "1997: Передача Гонконга Китаю Великобританией.",
    ],
    "1999 2004": [
      "1999: Введение евро как официальной валюты еврозоны.",
      "2000: Обеспокоенность, связанная с проблемой 2000 года (Y2K), которая вызвала минимальные перебои.",
      "2002: Создание Международного уголовного суда.",
      "2004: Индийский океанский цунами, вызвавший массовые разрушения.",
    ],
    "2006 2014": [
      "2006: Появление социальных сетей, таких как Facebook и Twitter.",
      "2007: Запуск первого iPhone компанией Apple.",
      "2009: Барак Обама стал первым афроамериканским президентом США.",
      "2012: Конец света по календарю майя не наступил.",
      "2014: Вспышка вируса Эбола в Западной Африке.",
    ],
    "2015 2022": [
      "2015: Частичное солнечное затмение, видимое в Южной Африке и частях Антарктики.",
      "2016: Телескоп Хаббл обнаружил самую далекую галактику из известных на тот момент, обозначенную как GN-z11.",
      "2018: SpaceX запустила ракету Falcon Heavy, самую мощную действующую ракету.",
      "2020: Пандемия COVID-19 вызвала глобальные потрясения и локдауны.",
      "2022: Запуск космического телескопа имени Джеймса Уэбба.",
    ],
  };

  useEffect(() => {
    const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
    circlePath.id = "circlePath";
    svgRef.current?.prepend(circlePath);

    const items = itemsRef.current;
    const numItems = items.length;
    const itemStep = 1 / numItems;
    const wrapProgress = gsap.utils.wrap(0, 1);
    const snap = gsap.utils.snap(itemStep);
    const wrapTracker = gsap.utils.wrap(0, numItems);

    items.forEach((item, i) => {
      gsap.set(item, {
        motionPath: {
          path: circlePath,
          align: circlePath,
          alignOrigin: [0.5, 0.5],
          end: i / numItems,
        },
        scale: 0.9,
      });
    });

    const tl = gsap.timeline({ paused: true, reversed: true });
    tl.to(wrapperRef.current, {
      rotation: 300,
      transformOrigin: "center",
      duration: 1,
      ease: "none",
    });
    tl.to(
      items,
      {
        rotation: "-=360",
        transformOrigin: "center",
        duration: 1,
        ease: "none",
      },
      0
    );
    tl.to(
      tracker.current,
      {
        item: numItems,
        duration: 1,
        ease: "none",
        modifiers: {
          item(value) {
            return wrapTracker(numItems - Math.round(value));
          },
        },
      },
      0
    );

    items.forEach((el, i) => {
      el.addEventListener("click", () => {
        const current = tracker.current.item;
        const activeItem = i;
        if (i === current) {
          return;
        }
        document.querySelector(".item.active")?.classList.remove("active");
        items[activeItem].classList.add("active");
        const diff = current - i;
        if (Math.abs(diff) < numItems / 2) {
          moveWheel(diff * itemStep);
        } else {
          const amt = numItems - Math.abs(diff);
          if (current > i) {
            moveWheel(amt * -itemStep);
          } else {
            moveWheel(amt * itemStep);
          }
        }
        setCurrentSlide(activeItem + 1);
      });
    });

    nextButtonRef.current?.addEventListener("click", () => {
      moveWheel(-itemStep);
    });

    prevButtonRef.current?.addEventListener("click", () => {
      moveWheel(itemStep);
    });

    function moveWheel(amount: number) {
      const progress = tl.progress();
      tl.progress(wrapProgress(snap(tl.progress() + amount)));
      const next = tracker.current.item;
      tl.progress(progress);
      document.querySelector(".item.active")?.classList.remove("active");
      items[next].classList.add("active");
      gsap.to(tl, {
        progress: snap(tl.progress() + amount),
        modifiers: {
          progress: wrapProgress,
        },
      });
      setCurrentSlide(next + 1);
    }

    return () => {
      items.forEach((el) => {
        el.removeEventListener("click", () => {});
      });
      nextButtonRef.current?.removeEventListener("click", () => {});
      prevButtonRef.current?.removeEventListener("click", () => {});
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".date-display",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, [currentSlide]);

  useEffect(() => {
    const numberElements = document.querySelectorAll(".item__number");
    numberElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    });
  }, [currentSlide]);

  useEffect(() => {
    const slides = document.querySelectorAll(".slide-content");
    gsap.fromTo(
      slides,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );
  }, [currentSlide]);

  useEffect(() => {
    gsap.fromTo(".slider", { opacity: 0 }, { opacity: 1, duration: 0.5 });
  }, [currentSlide]);

  useEffect(() => {
    gsap.fromTo(
      ".slide-content",
      { opacity: 0, y: 0 },
      { opacity: 1, y: 0, duration: 3 }
    );
  }, [dates[currentSlide - 1]]);

  return (
    <>
      <div className="block">
        <div className="title">
          <p>Исторические даты</p>
        </div>
        <div className="container">
          <div className="wrapper" ref={wrapperRef}>
            {Array.from({ length: totalSlides }, (_, i) => (
              <div
                key={i}
                className={`item-wrapper ${
                  i === currentSlide - 1 ? "active" : ""
                }`}
                ref={(el) => (itemsRef.current[i] = el!)}
              >
                <div className={`item ${i + 1}`}>
                  <span className="item__number">{i + 1}</span>
                </div>
                <div className="wrapper__label">
                  {i === currentSlide - 1 && (
                    <span className="label">{labels[i]}</span>
                  )}
                </div>
              </div>
            ))}
            <svg ref={svgRef} viewBox="0 0 300 300">
              <circle id="holder" className="st0" cx="151" cy="151" r="150" />
            </svg>
          </div>
        </div>
        <div className="date-display">
          <span className="left">{dates[currentSlide - 1].split(" ")[0]}</span>
          <span className="right">{dates[currentSlide - 1].split(" ")[1]}</span>
        </div>
        <div
          className="navigation"
          style={{ textAlign: "start", margin: "-50px 0px 70px 80px" }}
        >
          <p className="navigation__count">{`${String(currentSlide).padStart(
            2,
            "0"
          )}/${String(totalSlides).padStart(2, "0")}`}</p>
          <div className="navigation__buttons">
            <button id="prev" ref={prevButtonRef}>
              ‹
            </button>
            <button id="next" ref={nextButtonRef}>
              ›
            </button>
          </div>
        </div>
        <div className="slider">
          <button className="swiper-button-prev">‹</button>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            pagination={{ clickable: false }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
                pagination: { clickable: true },
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
                pagination: { clickable: true },
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
                pagination: { clickable: true },
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
                pagination: { clickable: true },
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
                pagination: { clickable: true },
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            scrollbar={{ draggable: true }}
          >
            {slidesData[dates[currentSlide - 1] as keyof typeof slidesData].map(
              (slideContent: string, index: number) => {
                const [year, ...text] = slideContent.split(": ");
                return (
                  <SwiperSlide key={index}>
                    <div className="slide-content">
                      <h3>{year}</h3>
                      <p>{text.join(": ")}</p>
                    </div>
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
          <button className="swiper-button-next">›</button>
        </div>
      </div>
    </>
  );
};

export default Slider;
