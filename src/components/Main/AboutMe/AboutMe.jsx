import "./AboutMe.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import student from "../../../images/student.png";

const AboutMe = () => {
  return (
    <section id="student" className="student">
      <SectionTitle title="Студент"></SectionTitle>
      <div className="student__container">
        <img
          className="student__image"
          src={student}
          alt="фотография студента факультета веб-разработки"
        />
        <div className="student__about">
          <h3 className="student__name">Виталий</h3>
          <p className="student__job">Фронтенд-разработчик, 30 лет</p>
          <p className="student__biography">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <Link
            className="student__link link"
            to="https://github.com/IrinaStabrovskaya"
            target="_blank"
          >
            Github
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
