<template>
  <button
    :class="{
      usebutton: true,
      enabled: !disabled && !checked,
      checked: !disabled && checked,
      disabled: disabled
    }"
    :tabindex="disabled ? -1 : tabIndex"
    :disabled="disabled"
    @click.stop="onClick">
    <div :class="{ outline }"></div>
    <span>
      <!-- @slot 버튼의 이름 -->
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
/**
 * 기본 버튼
 * 해당 컴포넌트 수정 시 버전 정보도 수정해야함.
 * - 작성방법은 'https://github.com/kaorun343/vue-property-decorator' 참조
 * - 주석 작성방법은 'https://github.com/kaorun343/vue-property-decorator' 참조
 * @author 이동환
 * @version 1.0.0
 */
import { Component, Prop, Model, Vue, Emit } from 'vue-property-decorator'

@Component // 컴포넌트에 다른 이름을 적용할려면 => ({ name: 'OtherName'})
export default class UseButton extends Vue {
  // '!'는 초기화 속성에 붙이는 prefix (타입스크립트에게 미리 알려주는 역활)
  /**
   * 버튼의 tabindex 값 (기본값: -1)
   */
  @Prop({ default: -1 }) private tabIndex!: Number;
  /**
   * 버튼의 비활성화를 설정하는 값 (기본값: false)
   */
  @Prop({ default: false }) private disabled!: Boolean;
  /**
   * 버튼의 outline 스타일 적용 유무 (기본값: true)
   */
  @Prop({ default: true }) private outline!: Boolean;
  /**
   * 버튼의 check 스타일 버튼 유무 (기본값: false)
   */
  @Prop({ default: false }) private check!: Boolean;
  /**
   * 버튼의 고유 ID로 필수 항목임.
   */
  @Prop({ default: 'none', required: true }) public readonly id!: String;
  /**
   * 버튼의 check 스타일 상태일때 check 상태 값.
   * 해당 값은 참조형태로 변경사항이 부모에 전달된다.
   */
  @Model('change', { type: Boolean, default: false }) private readonly checked!: Boolean;
  /**
   * 버튼 클릭시(Enter 포함) 발생하는 이벤트 부모에게 전달.
   * @event click
   * @type {Event}
   */
  @Emit('click')
  private handleClick (event: object) {
    return event
  }
  /**
   * 버튼의 Check 상태값을 부모로 전달한다 (check 스타일이 true로 설정되어 있어야함.)
   * 부모는 v-model을 설정해야 변경되는 값을 받거나 설정할 수 있다.
   * @event change
   * @type {Event}
   */
  @Emit('change')
  private handleChange () {
    return true
  }

  /**
   * 버튼 클릭시(Enter 포함) 발생하는 이벤트
   * @param event html의 event object
   */
  private onClick (event: object) {
    this.handleClick(event)
    this.check && this.handleChange()
  }
}
</script>

<style lang="scss" scoped>
  .enabled {
    color: var(--defualt-button-text);
    background: var(--defualt-button-bg);
    border-color: var(--defualt-button-border);
    cursor: pointer;
  }

  .disabled {
    color: var(--disable-button-text);
    background: var(--disable-button-bg);
    border-color: var(--disable-button-border);
    opacity: var(--disable-button-opacity);
    cursor: default;
  }

  .checked {
    color: var(--check-button-text);
    background: var(--check-button-bg);
    border-color: var(--check-button-border);
    cursor: pointer;

    div.outline {
      border: 1px dashed #808080 !important;
    }
  }

  .outline {
    border-style: solid;
    border-radius: 3px;
    border-width: 1px;
    border-color: transparent;
    box-sizing: border-box;
  }

  .usebutton {
    position: relative;
    outline: none;
    border-style: solid;
    border-radius: 3px;
    border-width: 1px;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    &:not([disabled]):hover {
      color: var(--hover-button-text);
      background: var(--hover-button-bg);
      border-color: var(--hover-button-border);
    }

    &:not([disabled]):active {
      color: var(--push-button-text);
      background: var(--push-button-bg);
      border-color: var(--push-button-border);
    }

    &:not([disabled]):focus {
      @extend .checked
    }

    div {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }

    span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
