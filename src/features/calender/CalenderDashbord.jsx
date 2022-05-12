import React, { useState } from "react";
// FullCalendarコンポーネント。
import FullCalendar from "@fullcalendar/react";
// FullCalendarで週表示を可能にするモジュール。
import timeGridPlugin from "@fullcalendar/timegrid";
// FullCalendarで月表示を可能にするモジュール。
import dayGridPlugin from "@fullcalendar/daygrid";
// FullCalendarで日付や時間が選択できるようになるモジュール。
import interactionPlugin from "@fullcalendar/interaction";
/**
 * 開始時間などを入力する際に、カレンダーから入力できるようにするためのライブラリとしてDatePickerを使用。
 * DatePickerコンポーネント、ロケール設定用のモジュール。
 */
import DatePicker, { registerLocale } from "react-datepicker";
// DatePickerのロケールを設定に使用。
import ja from "date-fns/locale/ja";
//セマンティックUI
import { Icon, Segment } from "semantic-ui-react";
/**
 * Material-UIを通して、Styleを適用するためのモジュール。
 * - createStyles: 型推論を解決してくれるモジュール。
 * - makeStyles: StyleをHookAPIで適用させるモジュール。
 */
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    cover: {
      opacity: 0,
      visibility: "hidden",
      position: "fixed",
      width: "100%",
      height: "100%",
      zIndex: 1000,
      top: 0,
      left: 0,
      background: "rgba(0, 0, 0, 0.3)",
    },
    form: {
      opacity: 0,
      visibility: "hidden",
      position: "fixed",
      top: "30%",
      left: "35%",
      fontWeight: "bold",
      background: "rgba(255, 255, 255)",
      width: "500px",
      height: "400px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
    },
    inView: {
      // cover, formを表示する時に適用するStyle。
      opacity: 1,
      visibility: "visible",
    },
  })
);
// DatePickerのロケールを日本に設定。
registerLocale("ja", ja);

export default function CalenderDashbord() {
  const classes = useStyles();
  /**
   * 予定を追加する際にCalendarオブジェクトのメソッドを使用する必要がある。
   * (CalendarオブジェクトはRef経由でアクセスする必要がある。)
   */
  const ref = React.createRef();

  const [inputTitle, setInputTitle] = useState(""); // フォームに入力されたタイトル。
  const [inputStart, setInputStart] = useState(new Date()); // イベントの開始時刻。
  const [inputEnd, setInputEnd] = useState(new Date()); // イベントの終了時刻。
  const [inputMemo, setInputMemo] = useState(new Date()); // フォームに入力されたメモ。
  const [inView, setInView] = useState(false); // イベント登録フォームの表示有無。(trueなら表示する。)
  const [isChange, setIsChange] = useState(false); //入力フォームと変更フォーム
  const [myEvents, setMyEvents] = useState([]); // 登録されたイベントが格納されていく。myEventsTypタイプの配列。

  /**
   * カレンダーがクリックされた時にイベント登録用のフォームを表示する。
   * それぞれのフォームが下記の状態で表示される。
   *  - タイトル: 空欄
   *  - 開始: クリックしたカレンダーの開始時間
   *  - 終了: クリックしたカレンダーの終了時間
   */
  const handleCLick = (info) => {
    /**
     * infoにはカレンダーに登録されたイベントが入ってくる。そのイベントのIDを元にmyEvents
     * に格納されたイベントを取り出してStateに保存する。
     */
    const event = myEvents[info.event.id];
    const title = event.title;
    const memo = event.memo;
    const start = event.start;
    const end = event.end;

    setInputTitle(title);
    setInputStart(start);
    setInputEnd(end);
    setInputMemo(memo);
    setInView(true);
  };

  /**
   * カレンダーから登録された予定をクリックした時にイベント変更用のフォームを表示する。
   * それぞれのフォームが下記の状態で表示される。
   *  - タイトル: 選択した予定のタイトル
   *  - 開始: 選択した予定の開始時間
   *  - 終了: 選択した予定の終了時間
   */
  const handleSelect = (selectinfo) => {
    const start = new Date(selectinfo.start);
    const end = new Date(selectinfo.end);
    start.setHours(start.getHours());
    end.setHours(end.getHours());

    setInputTitle("");
    setInputMemo("");
    setInputStart(start);
    setInputEnd(end);
    setInView(true);
  };

  /**
   * カレンダーに予定を追加する。
   */
  const onAddEvent = () => {
    const startTime = inputStart;
    const endTime = inputEnd;

    if (startTime >= endTime) {
      alert("開始時間と終了時間を確認してください。");
      return;
    }
    const event = {
      id: myEvents.length,
      title: inputTitle,
      memo: inputMemo,
      start: startTime,
      end: endTime,
    };

    // Stateにイベントを追加する。ここで登録されたイベントは、予定を変更するときなどに使用する。
    setMyEvents([...myEvents, event]);

    // カレンダーに予定を登録して表示するための処理。
    ref.current.getApi().addEvent(event);
  };

  /**
   * ここからはフォームを構成する要素。
   */
  //フォームが表示された時に、グレー背景でフォーム以外を非アクティブ化に見えるようにするための要素。
  const coverElement = (
    <div
      onClick={() => setInView(false)}
      className={inView ? `${classes.cover} ${classes.inView}` : classes.cover}
    />
  );

  const titleElement = (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
      <label>タイトル</label>
      <input
        type='text'
        value={inputTitle}
        name='inputTitle'
        onChange={(e) => {
          // タイトルが入力されたら、その値をStateに登録する。
          setInputTitle(e.target.value);
        }}
      />
    </div>
  );

  const startTimeElement = (
    <div style={{ marginTop: 10 }}>
      <label>開始</label>
      <DatePicker
        locale='ja'
        dateFormat='yyyy/MM/d HH:mm'
        selected={inputStart}
        showTimeSelect
        timeFormat='HH:mm'
        timeIntervals={10}
        todayButton='today'
        name='inputStart'
        onChange={(time) => {
          setInputStart(time);
        }}
      />
    </div>
  );

  const endTimeElement = (
    <div style={{ marginTop: 10 }}>
      <label>終了</label>
      <DatePicker
        locale='ja'
        dateFormat='yyyy/MM/d HH:mm'
        selected={inputEnd}
        showTimeSelect
        timeFormat='HH:mm'
        timeIntervals={10}
        todayButton='today'
        name='inputEnd'
        onChange={(time) => {
          setInputEnd(time);
        }}
      />
    </div>
  );

  const memoElement = (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
      <label>メモ</label>
      <textarea
        rows='3'
        value={inputMemo}
        name='inputMemo'
        onChange={(e) => {
          // タイトルが入力されたら、その値をStateに登録する。
          setInputMemo(e.target.value);
        }}
      />
    </div>
  );

  const btnElement = (
    <>
      {isChange ? (
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <input
            type='button'
            value='削除'
            // onClick={() => onDeleteEvent()}
            style={{ backgroundColor: "white", fontSize: 15 }}
          />
          <input
            type='button'
            value='変更'
            // onClick={() => onChangeEvent()}
            style={{ backgroundColor: "white", fontSize: 15 }}
          />
        </div>
      ) : (
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <input
            type='button'
            value='キャンセル'
            onClick={() => {
              setInView(false);
            }}
            style={{ backgroundColor: "white", fontSize: 15 }}
          />
          <input
            type='button'
            value='保存'
            onClick={() => onAddEvent()}
            style={{ backgroundColor: "white", fontSize: 15 }}
          />
        </div>
      )}
    </>
  );

  const formElement = (
    <div
      className={inView ? `${classes.form} ${classes.inView}` : classes.form}
    >
      <form>
        {isChange ? (
          <div
            style={{ display: "flex", justifyContent: "center", fontSize: 20 }}
          >
            <Icon name='calendar alternate outline' color='blue' />
            予定を変更
          </div>
        ) : (
          <div
            style={{ display: "flex", justifyContent: "center", fontSize: 20 }}
          >
            <Icon name='calendar alternate outline' color='blue' />
            予定を入力
          </div>
        )}
        {titleElement}
        {startTimeElement}
        {endTimeElement}
        {memoElement}
        {btnElement}
      </form>
    </div>
  );

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Icon name='calendar alternate outline' size='huge' color='teal' />
        <h1>スケジュール管理</h1>
      </div>
      <Segment>
        {coverElement}
        {formElement}
        <FullCalendar
          locale='ja' // ロケール設定。
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]} // 週表示、月表示、日付等のクリックを可能にするプラグインを設定。
          initialView='timeGridWeek' // カレンダーの初期表示設定。この場合、週表示。
          slotDuration='00:30:00' // 週表示した時の時間軸の単位。
          selectable={true} // 日付選択を可能にする。interactionPluginが有効になっている場合のみ。
          businessHours={{
            // ビジネス時間の設定。
            daysOfWeek: [1, 2, 3, 4, 5], // 0:日曜 〜 7:土曜
            startTime: "00:00",
            endTIme: "24:00",
          }}
          weekends={true} // 週末を強調表示する。
          titleFormat={{
            // タイトルのフォーマット。(例：2022年5月)
            year: "numeric",
            month: "short",
          }}
          headerToolbar={{
            // カレンダーのヘッダー設定
            start: "title", // タイトルを左に表示する。
            center: "prev, next, today", // 「前月を表示」、「次月を表示」、「今日を表示」ができるボタンを画面の中央に表示する。
            end: "dayGridMonth,timeGridWeek", // 月・週表示を切り替えるボタンを表示する。
          }}
          ref={ref}
          eventClick={handleCLick}
          select={handleSelect}
        />
      </Segment>
    </div>
  );
}
