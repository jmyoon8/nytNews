# 구동방식

react native에 환경설정은 아래 페이지를 따라 하시면 됩니다.  
https://reactnative.dev/docs/environment-setup  
react nativ를 설치하셨다면

1. rootdirectory에서 터미널에`npm install`을 입력 하려 패키지를 인스톨
2. `cd ios`으로 ios폴더로 접근하여 `pod install`을 입력 하려 pod파일을 인스톨합니다.
3. 이후 다시 `cd ...` 을 입력하여 rootDirectory으로 이동한뒤
4. `npm run ios`으로 스크립트를 실행시켜주세요!

# 네비게이션 구조

![](https://images.velog.io/images/jmyoon8/post/892e0fff-23a8-4f58-bcd0-2c68ec37457f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-11-15%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.10.46.png)

# 파일구조

```javascript
|-rootDirectory
    |--modules 			--source폴더
        |-ClipNewsScreen   --클립한 기사 콤포넌트 폴더
          |-Components
             |-SearchOptionList.tsx
          |-Screen
             |-ItemList.tsx
          |-types.ts
        |-Main              --랜딩페이지 콤포넌트 폴더
          |-Components
             |-ClipedCategory.tsx
             |-CoronaWebView.tsx
             |-MostViewedArticle.tsx
             |-MostViewList.tsx
             |-MostViewSelectBox.tsx
             |-NewDeskCategoryList.tsx
             |-NewsDeskCategoryPageNation.tsx
          |-Images
             |-backGround.png
          |-Navigations
             |- NewsDeskStackNavigation.tsx
          |-Screen
             |-Main.ts
             |-NewsDeskCategory.ts
             |-NewsDeskView.ts
          |-type.ts
        |-SearchNews          --기사 검색 콤포넌트들의 폴더
          |-Components
             |-ArticleComponent.tsx
             |-ArticleList.tsx
             |-ArticleWebViewModal.tsx
             |-KeyWordComponent.tsx
             |-RecentlyKeyWordComponent.tsx
          |-Screen
             |-SearchScreen.tsx
          |-types.ts
        |-utils           --프로젝트에 사용된 유틸
          |-reduxToolkit
             |-configureStroe.ts
             |-getArticleSlice.ts
             |-reducers.ts
             |-reduxType.ts
          |-AsyncStorageHandler.ts
          |-AxiosInstance.ts
          |-GlobalStyle.ts
          |-GolobalColors.ts
          |-NavigatorsAndTypes.ts
          |-NewsDesks.ts
```

### 파일구조를 나눈 원칙

1. MainTab의 스크린에 따라 폴더를 나누었습니다
2. 나눠진 스크린을 감싸는 screen들은 Screen폴더에 저장하였고
   screen에 들어가는 component들은 Components폴더안에 저장하였습니다.
3. 타입은 각각 스크린이 속해있는 폴더에 위치했습니다(한곳에서 모아서 관리하면 프로젝트가 커질시에 찾기 복잡해집니다)
4. 그외에 폴더들은 필요시 생성하여 만들어 두었습니다.
5. utills폴더는 프로젝트에 전역적으로 사용되는 기능들을 모아놨습니다.
6. 모든 기준은 코드들이 원활히 관리될 수 있도록 구분하였습니다.

# 사용한 패키지와 사용이유

### reduxjs/toolkit

1. 리덕스를 더욱더 쉽게 사용할 수 있도록 만들어진 라이브러리입니다.
2. Promise Middleware와 Thunk가 내장되어있습니다.
3. 때문에 리덕스환경을 너무나도 쉽게 만들수 있습니다.

참고한싸이트 : https://redux-toolkit.js.org/

### axios

1. instance사용가능 : baseUrl를 사용하거나 인터셉트를 사용하여 요청보내기전/요청받기전에 행동을 수행할 수 있다.
2. JSON데이터 자동변환(fetch에선 .json을 사용해야한다)
3. 대부분 브라우저와 호환가능(IE까지!)
4. timeOut설정 가능

참고한싸이트 : https://sso-feeling.tistory.com/508

### moment

1. 가장 유명한 날짜 관련 라이브러리 입니다 날짜에 관련된 모든 것들을 제공해줍니다.

참고한싸이트 : https://momentjs.com/

### react-native-vector-icons

1. 많은 수의 svg아이콘들을 제공해줍니다.

참고한 싸이트 : https://oblador.github.io/react-native-vector-icons/

### react-native-webview

1. 인앱에서 웹뷰를 띄우기 위한 라이브러리입니다.

참고한 싸이트 : https://github.com/react-native-webview/react-native-webview

### lodash

1. 가장 유명한 js의 object 컨트롤 라이브러리입니다.
2. 웹 api호출시 lodash의 debounce펑션을 사용하여 연속적인 요청중 마지막 요청만 호출되도록 하였습니다.
3. nyt의 api는 짧은 시간 내에 연속으로 호출시 에러가 발생하기 때문에 사용하였습니다.

참고한 싸이트 : https://lodash.com/

### async-storage

1. 앱 내부에 반영구적(앱이 삭제되면 지워지므로)으로 값을 저장하기위한 storage 라이브러리입니다.

### react-native-sticky-parallax-header

1. stickyheader를 위한 라이브러리입니다.

참고한 싸이트 : https://github.com/netguru/sticky-parallax-header

### Convention을위한 툴

1. eslint
2. prettier

# 프로젝트를 마치며

> 요청해주신 과제는 약3일차 쯤에 마무리가 되었습니다.  
> 5일이라는 기한안에 하기에는 적은 과제라고 생각되었고 이과제 안에 숨겨진 의미는  
> nyt에서 제공하는 api를 좀더 분석하고 기능을 추가하는 것이라고 생각했습니다.  
> 그리고 메인화면에 코로나기사와 가장많이본 뉴스 그리고 newsDesk를 추가하였습니다.  
> 이과정속에서 이과제에 더큰 의미가 있음을 느겼습니다.  
> 제가 느꼈던 의미는 다음과 같습니다.

1. 과제에 있는 요구사항은 문제라기보단 저에게 할당된 업무라고 생각하게 되었습니다.
   -  이유1 : 누구라도 알아듣기 쉽게 풀어서 설명이 되어있었습니다.
   -  이유2 : 요구사항의 설명이 받는사람을 배려하여 작성되었다고 생각되었습니다.  
      마치 회사동료에게 요청하듯이
2. 디자인의 소중함을 다시한번 느꼈습니다.
   -  이유 : 누군가가 항상 만들어주던 디자인이 없이 혼자 만들려니 많은 시행착오가 있었습니다.  
      (결국 개발자style의 디자인이 나왔습니다.)
3. 저에게 요구된 기능이 아닌 다른 기능들을 생각할 땐 정말 많은 고민이 생겼습니다.
   -  이유 : 제가 생각한 기능들이 정말로 필요한 것인가? 에대한 고뇌가 생겼습니다.

위에 3가지 느낌점을 통해 제가 찾은 숨겨진 의미는  
저에게 주어진 업무 또한 동료들의 고민과 고뇌를 거쳐 저에게 온 것이고 그 과정속에 항상 배려가 있어야한다는 것입니다.  
또한 다른 부서에 있는 동료들은 제가 잘 하지 못하는 것을 잘하기 때문에 존재하며 업무로써 저와 이어져 있다는 생각을 하게 되었습니다.  
개발을 하다보면 시야가 직선이 되어 주변을 살피지 못할 때가 많습니다.  
때문에 문제에 대해서 해결하기위해 주변을 살피지 못하고 저혼자 해결하다보니 마치 저혼자 일을 다 하고 있다는 오만한 생각을 할때가 있지만 결국 동료들이 저를 도와주고 있다는 것을 이번 과제를 통해 다시한번 생각하게 되었습니다.
