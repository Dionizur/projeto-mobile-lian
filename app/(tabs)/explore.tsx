import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';

export const options = {
  headerShown: false,
};

type Task = {
  task: string;
  completed: boolean;
};

export default function ExploreScreen() {
  const { userName } = useLocalSearchParams();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState<{ [date: string]: Task[] }>({});
  const [modalVisible, setModalVisible] = useState(false);

  const addTask = () => {
    if (taskInput.trim() === '') return;

    const newTask = { task: taskInput.trim(), completed: false };
    setTasks((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newTask],
    }));

    setTaskInput('');
    setModalVisible(false);
  };

  const tasksForSelectedDate = tasks[selectedDate] || [];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.profileBox}>
          <Text style={styles.profileText}>👤 Perfil do Usuário</Text>
          <Text style={styles.profileName}>{userName}</Text>
        </View>

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

        {tasksForSelectedDate.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma tarefa para este dia.</Text>
        ) : (
          <FlatList
            data={tasksForSelectedDate}
            keyExtractor={(item, index) => `${item.task}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>• {item.task}</Text>
              </View>
            )}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Adicionar tarefa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}
        >
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
        </KeyboardAvoidingView>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  profileBox: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  profileText: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 4,
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
