const mongoose = require("mongoose");
const Notice = require("../models/news.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/news-server";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const news = [
  {
    title: "Manifestación en Barcelona",
    text: `PP, Ciudadanos y Vox se han citado en una manifestación en Barcelona para celebrar la Fiesta Nacional. 
        En la cabecera de la marcha se podía leer en una pancarta "Más España y más español".`,
    image:
      "https://www.metropoliabierta.com/uploads/s1/23/31/61/6/fotonoticia-20221012140105-1920_9_1200x480.jpeg",
    date: "2022-10-12",
  },
  {
    title: "Pitos y abucheos a Sánchez",
    text: `El presidente del Gobierno, Pedro Sánchez, ha llegado a la zona de autoridades del Día de la Hispanidad en la 
    Plaza de Lima entre pitos y abucheos por parte del público que se encontraba en la zona. Además, se ha retrasado, 
    haciendo esperar a los reyes.`,
    image:
      "https://www.elindependiente.com/wp-content/uploads/2022/10/Captura-de-pantalla-2022-10-12-a-las-11.05.00-e1665565701922-656x368.png",
    date: "2022-10-12",
  },
  {
    title: " Implantan 'minicerebros' humanos en ratas recién nacidas y logran influir en su comportamiento",
    text: `Los organoides son diminutas estructuras en 3D derivadas de células madre que imitan la función de los órganos y 
    podrían ser clave para el estudio de enfermedades. Ahora, científicos han logrado implantar este tejido cerebral humano en 
    el cerebro de ratas, salvando importantes limitaciones previas. `,
    image:
      "https://img2.rtve.es/v/6712234/vertical/?h=400",
    date: "2022-10-12",
  },
  {
    title: "Un empate in extremis del Barça le complica su futuro en la Champions",
    text: `Tocado, pero no hundido. El Barcelona no se baja del barco de la Champions League tras empatar frente al Inter de 
    Milán en su feudo (3-3). El choque comenzó con un vendaval blaugrana que se fue diluyendo con el paso de los minutos. Dembéle
    adelantó a los locales con un tanto en jugada grupal, pero el cuadro italiano le dio la vuelta en la segunda parte gracias a los
     tanto de Barella y Lautaro.`,
    image:"https://img2.rtve.es/i/?w=1600&i=1665608684487.jpg",
    date: "2022-10-11",
  }
];

Notice.create(news)
    .then( noticeDb => {
        console.log(`created ${noticeDb} news`);
        mongoose.connection.close();
    })
    .catch( err => console.log(`An error occured while creating the news for news DB: ${err}`));