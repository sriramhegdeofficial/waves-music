import { v4 as uuidv4 } from "uuid";

function chillHop() {
  return [
    {
      name: "Bliss",
      artist: "Misha, Jussi Halme",
      id: uuidv4(),
      active: true,
      colors: ["#2C436F", "#7E8BBF"],
      cover:
        "https://chillhop.com/wp-content/uploads/2020/09/5bff1a6f1bd0e2168d29b4c841b811598135e457-300x300.jpg",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9248",
    },
    {
      name: "Alyosha",
      artist: "Monma, Misha",
      id: uuidv4(),
      active: false,
      colors: ["#F8B439", "#A66054"],
      cover:
        "https://chillhop.com/wp-content/uploads/2021/03/75adfe0661d06a9ea66d9c2e99b31e92ae450ebe-300x300.jpg",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=16066",
    },
    {
      name: "Spiritual Mind",
      artist: "C Y G N",
      id: uuidv4(),
      active: false,
      colors: ["#352750", "#88A7E2"],
      cover:
        "https://chillhop.com/wp-content/uploads/2021/02/d12927eedcc2f5afba2ab049a4a1ea46c2266ae3-300x300.jpg",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=14987",
    },
    {
      name: "Parksong",
      artist: "Sleepy Fish",
      id: uuidv4(),
      active: false,
      colors: ["#50AC9E", "#953C4A"],
      cover:
        "https://chillhop.com/wp-content/uploads/2021/01/453b13ae3c0e2eec280fcc6357800b825239806e-300x300.jpg",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=12732",
    },
  ];
}

export default chillHop;
