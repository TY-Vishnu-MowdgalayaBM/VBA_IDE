# UseButton Spec

1. 상위 Tag에 크기에 최대화 버튼으로 활성화 된다.
2. TabIndex를 설정할 수 있다.
3. Text를 설정할 수 있다.
   - <b>버튼 크기보다 Text가 길 경우</b>
   > <pre>'...'로 표시</pre>
   > <span style="color:red;">마우스 Over시 Tooltip으로 전체 Text 내용 출력</span>
4. Disable, Enable를 설정할 수 있다.
   - Disable 상태에서는 이벤트 및 기타 기능이 동작하지 않는다.
5. Outline 상태를 설정할 수 있다.
6. 마우스 동작시 스타일이 변경된다. (다자인 가이드 참고)
   - Hover
   - Click
   - Checked(Focus)
   - Active
7. 마우스 클릭시 이벤트를 발생한다.
8. Key Enter 입력시 이벤트를 발생한다.(마우스 클릭시와 동일 이벤트)
9. <span style="color:red;">Shortcutkey, Namekey를 설정할수 있고 해당 키 입력시 이벤트를 발생한다.(마우스 클릭시와 동일 이벤트)</span>
10. Theme를(Style)를 변경할 수 있다.

- <span style="color:red;">붉은색: 해당 기능은 다른 컨트롤에서 구현.</span>
