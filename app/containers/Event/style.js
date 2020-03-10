import styled from 'styled-components';

export const Wrapper = styled.div`
.spin-box {
  height: 100vh;
  text-align:center;
  margin-top: 140px;
}
.ant-carousel .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel .slick-slide h3 {
  color: #fff;
}
.img-box {
    width: 100%;
    height: 182px;
    &.carousel {
      height: 369px;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
`;
