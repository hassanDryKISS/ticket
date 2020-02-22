import styled from 'styled-components';

export const Wrapper = styled.div`
.ant-carousel {
  box-shadow: 0 5px 12px rgba(0,0,0,.1);
}
  .ant-carousel .slick-slide {
    text-align: center;
    height: 368px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;

  }

  .ant-carousel .slick-slide h3 {
    color: #fff;

  }
  .img-box {
    width: 100%;
    height: 369px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .ant-card-body {
    text-align: left;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;
