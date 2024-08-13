# React date picker based on dayjs

A date picker with time picker similar to Chrome's built-in date picker. The package exports a react component <DatePicker />

## Install
npm install @nirall/react-date-picker-chrome

## Usage
With built-in input design

```
import { DatePicker } from '@nirall/react-date-picker-chrome';

function App() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="App">
      <DatePicker onChange={v => setDate(v)} value={date} />
    </div>
  );
}
```

You can provide your own input as a child element

```
import { DatePicker } from '@nirall/react-date-picker-chrome';

function App() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="App">
      <DatePicker onChange={v => setDate(v)} value={date}>
        // your input
        {date?.toISOString()}
      </DatePicker>
    </div>
  );
}
```

There are several variables for styling. You can pass them to the "style" property:

--text: the main color of text and other elements such as arrows;

--main-bg: main background color;

--selected-text: text color in selected cells (days, hours, etc.);

--selected-bg: background color of selected cells (days, hours, etc.);

--button: color of buttons (today, delete);

--icon: color for input icons (calendar and arrow);

--border: color for borders;

--year: year cell background color;

--radius: radius for input and calendar, cells have radius equal to --radius / 2;

```
import { DatePicker } from '@nirall/react-date-picker-chrome';

let style = {
  '--text': '#fff',
  '--selected-text': '#666',
  '--selected-bg':' #AAA',
  '--button': '#4D6ECF',
  '--main-bg': '#000',
  '--icon': 'red',
  '--border': 'yellow',
  '--year': 'rgba(255, 255, 255, 0.1)',
  '--radius': '20px',
}

function App() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="App">
      <DatePicker onChange={v => setDate(v)} value={date} style={style} />
    </div>
  );
}
```

The component can automatically position the calendar field relative to the screen, but you can also specify it directly

```
<DatePicker onChange={v => setDate(v)} value={date} position="bottom-right" />
```

To change the default button names ("today", "delete") there are corresponding properties - "todayWord", "deleteWord".

## git
[https://github.com/Nirall/react-date-picker-chrome](https://github.com/Nirall/react-date-picker-chrome)
