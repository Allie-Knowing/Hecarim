import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import useAlert from "hooks/useAlert";
import { forwardRef, Fragment, useCallback, useMemo, useRef } from "react";
import { useTheme } from "styled-components/native";
import Tool, { ToolItem } from "./Tool";

interface PropsType {
  reportCallback: (description: string) => Promise<void>;
}

const ReportModal = forwardRef<BottomSheetModalMethods, PropsType>(({ reportCallback }, ref) => {
  const theme = useTheme();
  const descriptionRef = useRef<string>("");
  const confirmSheetRef = useRef<BottomSheetModalMethods>(null);
  const { dismissAll } = useBottomSheetModal();
  const { showAlert, closeAlert } = useAlert();

  const onSubmitPress = useCallback(async () => {
    dismissAll();

    await reportCallback(descriptionRef.current);

    showAlert({
      title: "신고 제출 완료",
      content: `신고가 제출되었습니다.\n사유: '${descriptionRef.current}'`,
      buttons: [
        {
          text: "확인",
          color: "black",
          onPress: (id) => closeAlert(id),
        },
      ],
    });
  }, [dismissAll, reportCallback, showAlert, closeAlert]);

  const onReportPress = useCallback(
    (description: string) => () => {
      descriptionRef.current = description;
      confirmSheetRef.current.present();
    },
    []
  );

  const reportItems: ToolItem[] = useMemo(
    () => [
      {
        color: theme.colors.grayscale.scale100,
        onPress: onReportPress("스팸"),
        text: "스팸",
      },
      {
        color: theme.colors.grayscale.scale100,
        onPress: onReportPress("음란물 또는 불법촬영물"),
        text: "음란물 또는 불법촬영물",
      },
      {
        color: theme.colors.grayscale.scale100,
        onPress: onReportPress("괴롭힘 또는 따돌림"),
        text: "괴롭힘 또는 따돌림",
      },
      {
        color: theme.colors.grayscale.scale100,
        onPress: onReportPress("욕설 및 비방"),
        text: "욕설 및 비방",
      },
      {
        color: theme.colors.grayscale.scale100,
        onPress: onReportPress("명예회손 또는 저작권 침해"),
        text: "명예회손 또는 저작권 침해",
      },
      {
        color: theme.colors.grayscale.scale100,
        onPress: onReportPress("기타 사유"),
        text: "기타 사유",
      },
    ],
    [onReportPress, theme]
  );

  const comfirmItems: ToolItem[] = useMemo(
    () => [
      {
        color: theme.colors.red.default,
        onPress: onSubmitPress,
        text: "신고 제출하기",
      },
      {
        color: theme.colors.grayscale.scale100,
        onPress: () => dismissAll(),
        text: "취소하기",
      },
    ],
    [theme, onSubmitPress, dismissAll]
  );

  return (
    <Fragment>
      <Tool ref={ref} items={reportItems} />
      <Tool ref={confirmSheetRef} items={comfirmItems} />
    </Fragment>
  );
});

ReportModal.displayName = "ReportModal";

export default ReportModal;
