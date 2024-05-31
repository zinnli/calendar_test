import * as S from "./LuckyBalls.styled";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModal, useToast } from "hooks";
import { SvgFrame, CenteredSvgFrame, CountLuckyDayModal } from "components";
import { CircleBoxIcon } from "assets";
import { ax } from "apis/axios";
import {
  LuckyBallDetail,
  LuckyBallGrid,
  LuckyBallType,
  LuckyDayDetail,
} from "types";

interface GetLuckyDayApiResponse {
  code: string;
  message: string;
  resData: LuckyDayDetail[] | null;
}

const MAX_LUCKY_BALLS = 7;

export default function LuckyBalls() {
  const [luckyBallData, setLuckyBallData] = useState<LuckyBallGrid>({
    row1: [],
    row2: [],
    row3: [],
  });
  const [luckyBallFaceImages, setLuckyBallFaceImages] = useState<string[]>([]);
  const { handleOpenModal, handleModalClose } = useModal();
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get<GetLuckyDayApiResponse>(
          "/luckydays/cycl/1",
          {
            params: { isCurrent: 1 },
          }
        );

        const test = { dday: 1, dtlNo: 1 };

        const fetchedData: LuckyBallDetail[] = [];
        if (test && Array.isArray(test)) {
          test.forEach((day) => {
            let type: LuckyBallType;
            if (day.dday === 0) {
              type = "LuckyBall_Dday";
            } else if (day.dday === 1) {
              type = "LuckyBall_D1";
            } else if (day.dday === 2) {
              type = "LuckyBall_D2";
            } else if (day.dday === 3) {
              type = "LuckyBall_D3";
            } else {
              type = "LuckyBall_unknown";
            }
            fetchedData.push({ type, dtlNo: day.dtlNo });
          });
        }

        while (fetchedData.length < MAX_LUCKY_BALLS) {
          fetchedData.push({ type: "LuckyBallFace" });
        }

        const shuffledData = fetchedData.sort(() => Math.random() - 0.5);

        setLuckyBallData({
          row1: shuffledData.slice(0, 2),
          row2: shuffledData.slice(2, 5),
          row3: shuffledData.slice(5, 7),
        });

        const faceImages = shuffledData
          .filter((ball) => ball.type === "LuckyBallFace")
          .map((_, index) => `/images/face-0${index + 1}.webp`);
        setLuckyBallFaceImages(faceImages);
      } catch (error) {
        addToast({ content: "오류가 발생했습니다." });
      }
    };

    fetchData();
  }, []);

  const renderLuckyBall = (ball: LuckyBallDetail, index: number) => {
    if (ball.type === "LuckyBallFace") {
      return (
        <S.LuckyBallFace
          key={index}
          imageUrl={luckyBallFaceImages[index % luckyBallFaceImages.length]}
        />
      );
    }

    switch (ball.type) {
      case "LuckyBall_unknown":
        return (
          <CenteredSvgFrame
            key={index}
            label="D-?"
            onClick={() => handleLuckyBallClick(ball)}
          >
            <SvgFrame
              key={index}
              css={S.LuckyBall_unknown}
              icon={<CircleBoxIcon />}
            />
          </CenteredSvgFrame>
        );
      case "LuckyBall_Dday":
        return (
          <CenteredSvgFrame
            key={index}
            label="D-day"
            onClick={() => handleLuckyBallClick(ball)}
          >
            <SvgFrame
              key={index}
              css={S.LuckyBall_Dday}
              icon={<CircleBoxIcon />}
            />
          </CenteredSvgFrame>
        );
      case "LuckyBall_D1":
        return (
          <CenteredSvgFrame
            key={index}
            label="D-1"
            onClick={() => handleLuckyBallClick(ball)}
          >
            <SvgFrame
              key={index}
              css={S.LuckyBall_D1}
              icon={<CircleBoxIcon />}
            />
          </CenteredSvgFrame>
        );
      case "LuckyBall_D2":
        return (
          <CenteredSvgFrame
            key={index}
            label="D-2"
            onClick={() => handleLuckyBallClick(ball)}
          >
            <SvgFrame
              key={index}
              css={S.LuckyBall_D2}
              icon={<CircleBoxIcon />}
            />
          </CenteredSvgFrame>
        );
      case "LuckyBall_D3":
        return (
          <CenteredSvgFrame
            key={index}
            label="D-3"
            onClick={() => handleLuckyBallClick(ball)}
          >
            <SvgFrame
              key={index}
              css={S.LuckyBall_D3}
              icon={<CircleBoxIcon />}
            />
          </CenteredSvgFrame>
        );
      default:
        return null;
    }
  };

  const handleLuckyBallClick = (ball: LuckyBallDetail) => {
    if (ball.type === "LuckyBallFace") {
      return;
    }

    if (ball.type === "LuckyBall_Dday" && ball.dtlNo) {
      navigate(`/luckydays/${ball.dtlNo}`);
      return;
    }

    let label = "";
    switch (ball.type) {
      case "LuckyBall_unknown":
        label = "아직 럭키 데이를 확인할 수 없어요.\n 조금만 기다려주세요.";
        break;
      case "LuckyBall_D3":
        label = "럭키 데이가 3일 남았어요. \n 조금만 기다려주세요.";
        break;
      case "LuckyBall_D2":
        label = "럭키 데이가 2일 남았어요. \n 조금만 기다려주세요.";
        break;
      case "LuckyBall_D1":
        label = "럭키 데이가 1일 남았어요. \n 조금만 기다려주세요.";
        break;
      default:
        label = "";
    }
    handleOpenModal(
      <CountLuckyDayModal label={label} onClose={handleModalClose} />
    );
  };

  return (
    <>
      <S.Container>
        <S.RowBox>
          {luckyBallData.row1.map((ball, index) => (
            <CenteredSvgFrame
              key={index}
              onClick={() => handleLuckyBallClick(ball)}
            >
              {renderLuckyBall(ball, index)}
            </CenteredSvgFrame>
          ))}
        </S.RowBox>

        <S.RowBox>
          {luckyBallData.row2.map((ball, index) => (
            <CenteredSvgFrame
              key={index}
              onClick={() => handleLuckyBallClick(ball)}
            >
              {renderLuckyBall(ball, index)}
            </CenteredSvgFrame>
          ))}
        </S.RowBox>

        <S.RowBox>
          {luckyBallData.row3.map((ball, index) => (
            <CenteredSvgFrame
              key={index}
              onClick={() => handleLuckyBallClick(ball)}
            >
              <CenteredSvgFrame
                key={index}
                label="D-day"
                onClick={() => handleLuckyBallClick(ball)}
              >
                <SvgFrame
                  key={index}
                  css={S.LuckyBall_Dday}
                  icon={<CircleBoxIcon />}
                />
              </CenteredSvgFrame>
            </CenteredSvgFrame>
          ))}
        </S.RowBox>
      </S.Container>
    </>
  );
}
