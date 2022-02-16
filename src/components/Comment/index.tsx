import * as S from "./styles";

const TestImage = require("../../assets/feed_test.jpg");

const Comment = () => {
  return (
    <S.Container>
      <S.ProfileImage source={TestImage} />
      <S.ContentContainer>
        <S.HeaderContainer>
          <S.Name>안병헌</S.Name>
          <S.Date>1일전</S.Date>
        </S.HeaderContainer>
        <S.Content>
          이런 코드가 대량으로 있을 때 앞자리 열린 태그만 동시선택해서 바꾸면,
          뒷 자리 닫힌 태그도 자동으로 타이핑한 태그로 변경됩니다.
        </S.Content>
      </S.ContentContainer>
    </S.Container>
  );
};

export default Comment;
