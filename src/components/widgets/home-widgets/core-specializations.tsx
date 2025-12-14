import { BrainCircuit, Cable, Pill, Tablets } from "lucide-react";

export default function CoreSpecializations() {
    return (
        <main>
            <div className="hidden w-full py-10  h-full md:flex flex-col gap-5 items-center justify-center ">
                <p className="text-xl font-bold text-center">Core Specializations</p>
                <p className="text-center text-base">Top-tier, high demand specializations across industry and academia </p>
                <div className="flex flex-row gap-10 py-5 items-start justify-start">
                    <div className="flex flex-col gap-3 items-start justify-start text-center w-[250px] bg-white shadow-2xl p-5 border-gray-200 border-2 rounded-md">
                        <Tablets className="text-red-400 bg-amber-100" size={30} />
                        <p className="font-bold text-lg pt-2">Genomics</p>
                        <p className="text-sm text-gray-700 text-start">Develop competence in bulk and single cell genomics across multi-omics modalities</p>
                    
                    </div>

                    <div className="flex flex-col gap-3 items-start justify-start text-center w-[250px] bg-white shadow-2xl p-5 border-gray-200 border-2 rounded-md">
                        <BrainCircuit className="text-blue-500 bg-amber-100" size={30} />
                        <p className="font-bold text-lg pt-2 text-start">Biomedical AI </p>
                        <p className="text-sm text-gray-700 text-start">Learn to train and deploy AI models for informing decisions in healthcare and pharma. </p>
                    </div>

                    <div className="flex flex-col gap-3 items-start justify-start text-center w-[250px] bg-white shadow-2xl p-5 border-gray-200 border-2 rounded-md">
                        <Pill className="text-hb-green bg-amber-100" size={30} />
                        <p className="font-bold text-lg pt-2 text-start">Drug Development</p>
                        <p className="text-sm text-gray-700 text-start">Learn to combine AI with structure and ligand based drug development </p>
                    </div>
                    
                </div>
                
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 p-5  rounded-xl">
                <p className="text-lg font-bold text-center">Core Specializations</p>
                <p className="text-sm text-center">
                    Top-tier, high demand specializations across industry and academia 
                </p>
                <div className="flex flex-col gap-5">
                    <div className="p-4 border-2 border-hb-green rounded-lg flex flex-col gap-2">
                        <Tablets className="text-red-400 bg-amber-100" size={30} />
                        <p className="font-bold">Genomics</p>
                        <p className="text-sm text-gray-700">
                            Develop competence in bulk and single cell genomics across multi-omics modalities              
                        </p>
                    </div>
                    <div className="p-4 border-2 border-hb-green rounded-lg flex flex-col gap-2">
                        <BrainCircuit className="text-blue-500 bg-amber-100" size={30} />
                        <p className="font-bold">Biomedical AI</p>
                        <p className="text-sm text-gray-700">
                            Learn to train and deploy AI models for informing decisions in healthcare and pharma.
                        </p>
                    </div>
                    <div className="p-4 border-2 border-hb-green rounded-lg flex flex-col gap-2">
                        <Cable className="text-hb-green bg-amber-100" size={30} />
                        <p className="font-bold">Drug Development</p>
                        <p className="text-sm text-gray-700">
                            Learn to combine AI with structure and ligand based drug development
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}