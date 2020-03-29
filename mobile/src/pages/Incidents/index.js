import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import api from '../../services/api';

/**
 * React native tem um componente chamado button
 * mas ele ja vem com algumas estilizações do android e do ios, então não vamos usar ele
 * por isso vamos usar o TouchableOpacity
 */

/**
 * TouchableOpacity: Cria algo clicavel e quando clicamos ele diminui a opacidade
 * FlatList: Para fazer listas no React Native
 */


import logoImg from '../../assets/logo.png';

import styles from './style'


export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const navigation = useNavigation();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fazer o usuario ir pra proxima pag quando clicar em ver mais detalhes
    function navigateToDetail(incident) {
        navigation.navigate('Detail', {incident});
    }

    async function loadIncidents() {
        if(loading){
            return;
        }

        if(total > 0  && incidents.lenght == total){
            return;
        }

        setLoading(true);
        const response = await api.get('incidents',{
            params: {page}
        });

        //copiar todos os valores do incidents e do response data
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia. </Text>

            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}//Faz sumir a barrinha de scroll quando false
                onEndReached={loadIncidents}
                onEndReachedTreshold={0.2}
                //Função responsavel pro renderizar o array
                //trocou o nome de item para icident
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.nome}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>

    );
}