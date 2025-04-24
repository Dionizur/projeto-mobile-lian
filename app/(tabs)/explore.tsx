import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';

export default function ExploreScreen() {
  const { userName } = useLocalSearchParams();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState<{ [date: string]: string[] }>({});
  const [modalVisible, setModalVisible] = useState(false);

  const addTask = () => {
    if (taskInput.trim() === '') return;
    const updatedTasks = {
      ...tasks,
      [selectedDate]: [...(tasks[selectedDate] || []), taskInput.trim()],
    };
    setTasks(updatedTasks);
    setTaskInput('');
    setModalVisible(false);
  };

  const tasksForSelectedDate = tasks[selectedDate] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {userName}!</Text>
      <Text style={styles.subtitle}>Selecione um dia para ver ou adicionar tarefas:</Text>

      <Calendar
        onDayPress={(day: { dateString: React.SetStateAction<string>; }) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#007AFF',
          },
        }}
        theme={{
          calendarBackground: '#222',
          dayTextColor: '#fff',
          monthTextColor: '#fff',
          arrowColor: '#fff',
        }}
      />

      <Text style={styles.sectionTitle}>Tarefas de {selectedDate}:</Text>

      <FlatList
        data={tasksForSelectedDate}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>• {item}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa para este dia.</Text>
        }
      />

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Adicionar tarefa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova tarefa para {selectedDate}</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua tarefa"
              value={taskInput}
              onChangeText={setTaskInput}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.button} onPress={addTask}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    marginVertical: 12,
  },
  taskItem: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  taskText: {
    color: 'white',
  },
  emptyText: {
    color: '#aaa',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  cancelText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
  },
});
