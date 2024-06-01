import React from "react";

import { LuckyBoardAfterPage, LuckyBoardBeforePage } from ".";
import { ArchiveModal, ButtonLayout } from "components";
import {
  useGetLuckyDayCycle,
  useGetLuckyDayCycleInfo,
  useGetLuckyDayCycleLastLuckyDays,
} from "services";
import { useModal, useToast } from "hooks";
import { formatDate } from "utils";
import * as S from "./LuckyBoardPage.styled";

const LuckyBoardPage: React.FC = () => {
  const hasLuckyday = sessionStorage.getItem("hasLuckyday")!;
  const isExperienced = sessionStorage.getItem("isExperienced")!;

  const { data } = useGetLuckyDayCycle({
    hasLuckyday: +hasLuckyday,
    query: { isCurrent: 1 },
  });
  const { data: lastLuckyDays } = useGetLuckyDayCycleLastLuckyDays({
    query: { isCurrent: 0 },
  });
  const { data: info } = useGetLuckyDayCycleInfo(data?.[0].cyclNo ?? 0, !!data);

  const { handleOpenModal } = useModal();
  const { addToast } = useToast();

  const expDatesString = info?.expDtList
    ?.map((item) => `${formatDate(item, "YYYY-MM-DD")}\n`)
    .join("")
    ?.replace(/,/g, "");

  const cycleInfo = <p>생성 옵션: ㅇㅇ</p>;

  const handleOpenLastLuckyDayModal = () => {
    if (!lastLuckyDays && !data?.[0].cyclNo) {
      return;
    }

    handleOpenModal(
      <ArchiveModal
        css={S.archiveModal}
        lastInfo={
          lastLuckyDays?.filter(
            (item) => item.dday !== 1 && item.date !== null
          ) || []
        }
      />
    );
  };

  const handleOpenCheckLuckyDayModal = () => {
    // if (!info)
    //   return addToast({ content: "진행 중인 럭키 데이 정보가 없어요." });

    handleOpenModal(<ArchiveModal css={S.archiveModal} moreInfo={cycleInfo} />);
  };

  return (
    <ButtonLayout
      variant="hasColor"
      firstLabel="지난 럭키데이"
      secondLabel="더보기"
      isHideButtons={isExperienced === "0"}
      handleClickFirstButton={handleOpenLastLuckyDayModal}
      handleClickSecondButton={handleOpenCheckLuckyDayModal}
    >
      <LuckyBoardBeforePage />
    </ButtonLayout>
  );
};

export default LuckyBoardPage;
