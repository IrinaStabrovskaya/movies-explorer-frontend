import "./AboutProject.css";
import SectionTitle from "../SectionTitle/SectionTitle";

const AboutProject = () => {
  return (
    <section id="project" className="project">
      <SectionTitle title="О проекте"></SectionTitle>
      <ul className="project__description">
        <li className="project__description-block">
          <h3 className="project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="project__description-block">
          <h3 className="project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>

      <div className="project__fig-container">
        <figure className="project__fig project__fig_green">
          <p className="project__fig-text">1 неделя</p>
          <figcaption className="project__figcaption">Back-end</figcaption>
        </figure>
        <figure className="project__fig">
          <p className="project__fig-text">4 недели</p>
          <figcaption className="project__figcaption">Front-end</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default AboutProject;
