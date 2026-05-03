import { useNexusStore } from "@/store/useNexusStore";
import DUASidebar from "@/components/DUASidebar";
import Dashboard from "@/components/Dashboard";
import PrismaAutores from "@/components/modules/PrismaAutores";
import MatrizSintesis from "@/components/modules/MatrizSintesis";
import SimuladorTransposicion from "@/components/modules/SimuladorTransposicion";
import GenogramaInteractivo from "@/components/modules/GenogramaInteractivo";

export default function Index() {
  const { activeModule, duaProfiles } = useNexusStore();

  const duaClasses = [
    duaProfiles.includes("tdah") ? "dua-tdah" : "",
    duaProfiles.includes("visual") ? "dua-visual" : "",
    duaProfiles.includes("altas-capacidades") ? "dua-altas-capacidades" : "",
  ].filter(Boolean).join(" ");

  const renderModule = () => {
    switch (activeModule) {
      case "prisma": return <PrismaAutores />;
      case "matriz": return <MatrizSintesis />;
      case "simulador": return <SimuladorTransposicion />;
      case "genograma": return <GenogramaInteractivo />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${duaClasses}`}>
      <DUASidebar />
      {renderModule()}
    </div>
  );
}
