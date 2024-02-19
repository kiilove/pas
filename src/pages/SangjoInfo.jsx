import React, { useEffect, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";

const SangjoInfo = () => {
  const [visibleTexts, setVisibleTexts] = useState([]);
  const viewRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = viewRefs.current.indexOf(entry.target);
          if (entry.isIntersecting) {
            // 화면에 보이는 텍스트 상태를 업데이트하되, 중복 추가를 방지합니다.
            setVisibleTexts((prevVisibleTexts) => {
              return prevVisibleTexts.includes(index)
                ? prevVisibleTexts
                : [...prevVisibleTexts, index];
            });
          } else {
            // 요소가 더 이상 보이지 않으면 상태에서 해당 인덱스를 제거합니다.
            setVisibleTexts((prevVisibleTexts) =>
              prevVisibleTexts.filter((item) => item !== index)
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    viewRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      viewRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);

  // 각 텍스트 항목에 대한 트랜지션을 설정합니다.
  const transitions = useTransition(visibleTexts, {
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    keys: (item) => item,
  });

  return (
    <div className="flex flex-col w-full" style={{ height: "4000px" }}>
      {new Array(10).fill(null).map((_, index) => (
        <div
          key={index}
          ref={(el) => (viewRefs.current[index] = el)}
          className="flex flex-col items-center justify-center w-full bg-red-200"
          style={{ height: "300px", margin: "50px 0" }}
        >
          {transitions(
            (style, item) =>
              item === index && (
                <animated.div style={style}>
                  {Array.from({ length: 3 }, (_, i) => (
                    <p key={i}>
                      텍스트 {index + 1}.{i + 1}
                    </p>
                  ))}
                </animated.div>
              ),
            // 이 keys 함수는 각 아이템(텍스트)의 고유성을 보장하기 위해 필요합니다.
            { keys: index }
          )}
        </div>
      ))}
    </div>
  );
};

export default SangjoInfo;
