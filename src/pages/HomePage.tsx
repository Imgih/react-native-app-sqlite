import React, { useState } from "react";
import AlunoRepository, { Aluno } from "../repository/AlunoRepository";
import { Button, View, Text} from "react-native";

const repository = new AlunoRepository();

const HomePage: React.FC = () => {
    const [alunos, setAlunos] = useState<Aluno[]>([]);

    const criarAluno =  async () => {
        const AlunoId = await repository.create(
            {
                nome: 'Giovanna',
                cpf: '49431797899',
                idade: Math.floor(Math.random() * (100 - 11)) + 10
            }
        );
        console.log("ALUNO CRIADO COM ID:", AlunoId);
    }

    const listarAlunos = async () => {
        const alunos: Aluno[] = await repository.listarAlunos();
        setAlunos(alunos);
        console.log(alunos);
    }

    const deleteAluno = async (id: number) => {
        const deleteAlunos = await repository.deleteAluno(id);
        console.log("ALUNOS DELETADOS:", deleteAlunos);

    };

    return(
        <View>
            <Button onPress={criarAluno} title="Criar"/>
            <Button onPress={listarAlunos} title="listar"/>
            {alunos.map(aluno => (
                <View key={`aluno-item-${aluno.id}`}>
                    <Text>
                        {`${aluno.id} - ${aluno.nome} - ${aluno.cpf}`}
                    </Text>
            <Button onPress={() => deleteAluno(aluno.id!)} title="Excluir" />
                </View>
            ))}

           
        </View>
    )
}

export default HomePage;

// React => framework reativo