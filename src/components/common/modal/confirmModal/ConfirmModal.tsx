import React from "react";
import * as S from "./ConfirmModal.styled";
import { useModal } from "hooks";
import { CloseIcon, LargeBoxIcon, ShortBoxIcon } from "assets";
import { BaseModal } from "../baseModal";
import { SvgFrame } from "components/common/svgFrame";

interface ConfirmModalProps {
  className?: string;
  title?: string;
  subTitle?: string | React.ReactNode;
  icon?: React.ReactNode;
  desc?: string;
  cancelLabel?: string;
  baseLabel: string;
  handleCancelClick?: (e: React.MouseEvent) => void;
  handleBaseClick: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

const ConfirmModal = React.forwardRef(
  (
    {
      className,
      title,
      subTitle,
      icon,
      desc,
      cancelLabel,
      baseLabel,
      handleCancelClick,
      handleBaseClick,
      children,
    }: ConfirmModalProps,
    ref: React.ForwardedRef<HTMLDialogElement>
  ) => {
    const { handleModalClose } = useModal();

    /* TODO: font 사이즈 통일 요청함 추후 확인 필요 */
    return (
      <BaseModal ref={ref} css={S.baseModal} className={className}>
        {!cancelLabel && <CloseIcon css={S.icon} onClick={handleModalClose} />}
        <div>
          {title && <S.Title>{title}</S.Title>}
          {subTitle ? (
            <S.CenterContent>
              <SvgFrame css={S.largeBoxIcon} icon={<LargeBoxIcon />} />
              <S.SubTitle>{subTitle}</S.SubTitle>
            </S.CenterContent>
          ) : (
            <>{icon}</>
          )}
          <S.Desc>{desc}</S.Desc>
        </div>
        {children && <div>{children}</div>}
        <S.ButtonWrapper>
          {/* TODO: 버튼 컴포넌트로 변경 후 수정 예정 */}
          {cancelLabel && (
            <S.CancelButton onClick={handleCancelClick}>
              <SvgFrame css={S.beigeIcon} icon={<ShortBoxIcon />} />
              <span>{cancelLabel}</span>
            </S.CancelButton>
          )}
          <S.BaseButton onClick={handleBaseClick}>
            <SvgFrame css={S.purpleIcon} icon={<ShortBoxIcon />} />
            <span>{baseLabel}</span>
          </S.BaseButton>
        </S.ButtonWrapper>
      </BaseModal>
    );
  }
);

ConfirmModal.displayName = "ConfirmModal";

export default ConfirmModal;
