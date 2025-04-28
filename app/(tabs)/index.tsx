import { Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [tip, setTip] = useState('');

  const router = useRouter();

  // Atualiza a hora a cada segundo'
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Exibe uma dica aleatória de produtividade
  useEffect(() => {
    const tips = [
      'Priorize as tarefas mais importantes.',
      'Faça pausas regulares para manter o foco.',
      'Use a técnica Pomodoro para produtividade.',
      'Organize suas tarefas no início do dia.',
      'Menos lógica, mais ansiedade.',
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  const handleCreateAccount = () => {
    if (!name || !email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    console.log('Conta criada:', { name, email, password });

    setAccountCreated(true);

    // Joga para a sengunda tela.
    router.push({ pathname: '/explore', params: { userName: name } });

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Gerenciador de tarefas PNCM</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">O seu dia sob controle 🧠</ThemedText>
        <ThemedText>
          Bem-vindo ao seu novo assistente pessoal! O PNCM é mais que um app é o seu parceiro na organização de tarefas, reuniões e afazeres diários.
        </ThemedText>
        <ThemedText>
          🔹 Planeje sua semana com clareza{'\n'}
          🔹 Acompanhe compromissos importantes{'\n'}
          🔹 Tenha uma agenda prática na palma da mão
        </ThemedText>
      </ThemedView>

      <ThemedView style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <ThemedText style={{ fontSize: 14 }}>🕒 {currentTime}</ThemedText>
      </ThemedView>

      <ThemedView style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <ThemedText style={{ fontStyle: 'italic' }}>💡 Dica do dia: {tip}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        {!accountCreated && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
              <ThemedText style={styles.buttonText}>Criar Conta</ThemedText>
            </TouchableOpacity>
          </>
        )}

        {accountCreated && (
          <ThemedView style={styles.successMessage}>
            <ThemedText style={styles.successText}>Conta criada com sucesso!</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: '#333',
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  successMessage: {
    marginTop: 10,
    backgroundColor: '#D4EDDA',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  successText: {
    color: 'black',
  },
});
