export interface EditorState {
  styles: EditorStateStyles;
  contentRaw: EditorStateContentRaw;
  contentShow: EditorStateContentShow;
}

export interface EditorStateStyles {
  input: EditorStateInput
}

export interface EditorStateInput {
  fontFamily: string;
  fontSize: string;
  fontColor: string;
}

export interface EditorStateContentRaw {

}

export interface EditorStateContentShow {

}