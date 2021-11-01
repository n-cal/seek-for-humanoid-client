import HumanoidItem from "../HumanoidItem/HumanoidItem";

function HumanoidsList({ humanoids }) {
  return (
    <div className="flex-col items-stretch flex-grow max-w-xl">
      {humanoids.map((humanoid) => (
        <HumanoidItem key={humanoid.id} humanoid={humanoid} />
      ))}
    </div>
  );
}

export default HumanoidsList;
