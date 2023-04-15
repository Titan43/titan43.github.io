import '../stylesheets/headers.css';

function SectionName(props) {
    return (
      <div className="SectionName">
        <h1 >
            {props.sectionName}
        </h1>
      </div>
    );
}
export default SectionName;