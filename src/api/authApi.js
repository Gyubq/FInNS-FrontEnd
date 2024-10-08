// import api from 'axios';
import api from '@/api';

const BASE_URL = '/api/member';
const headers = { 'Content-Type': 'multipart/form-data' };

export default {
  // username 중복 체크, true: 중복(사용불가), false: 사용 가능
  async checkUsername(username) {
    try {
      const { data } = await api.get(`${BASE_URL}/checkusername/${username}`);
      console.log('AUTH GET CHECKUSERNAME', data);
      return data;
    } catch (error) {
      console.error('Error checking username:', error.response || error);
      throw error;
    }
  },
  async create(member) {
    // 아바타 파일 업로드 – multipart 인코딩 필요 → FormData 객체 사용
    const formData = new FormData();
    formData.append('username', member.username);
    formData.append('password', member.password);
    formData.append('password2', member.password2);
    formData.append('birth', member.birth);

    try {
      const { data } = await api.post(BASE_URL, formData, { headers });
      console.log('AUTH POST: ', data);
      return data;
    } catch (error) {
      console.error('Error creating member:', error.response || error);
      throw error;
    }
  },
  async update(member) {
    console.log('업데이트 요청 username:', member.username); // 로그에서 정확한 필드명 사용
    const formData = new FormData();
    formData.append('username', member.username);
    formData.append('password', member.password);

    // `birth` 형식 변환
    formData.append(
      'birth',
      member.birth instanceof Date
        ? member.birth.toISOString().split('T')[0] // ISO 형식에서 날짜 부분만 사용
        : member.birth
    );

    if (member.avatar) {
      formData.append('avatar', member.avatar);
    }

    try {
      const { data } = await api.put(
        `${BASE_URL}/${member.username}`,
        formData,
        {
          headers,
        }
      );
      console.log('AUTH PUT: ', data);
      return data;
    } catch (error) {
      console.error('Error updating member:', error.response || error);
      throw error;
    }
  },
  // async changePassword(formData) {
  //   try {
  //     const { data } = await api.put(
  //       `${BASE_URL}/${formData.username}/changepassword`,
  //       formData,
  //       { headers }
  //     );
  //     console.log('AUTH PUT: ', data);
  //     return data;
  //   } catch (error) {
  //     console.error('Error changing password:', error.response || error);
  //     throw error;
  //   }
  // },
};