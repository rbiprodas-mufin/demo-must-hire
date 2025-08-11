"use client";

import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Card,
  Row,
  Col,
  InputNumber,
  Space,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useCreateJob } from "@/apis/jobs";
import { CreateJobPayload } from "@/types/job";
import "@ant-design/v5-patch-for-react-19";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";

const { TextArea } = Input;
const { Option } = Select;

const departments = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
];

export default function CreateJob() {
  const router = useRouter();
  const { mutate: createJob, isPending } = useCreateJob();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const cleanArray = (arr: string[]) =>
      arr.map((item) => item.trim()).filter(Boolean);

    const payload: CreateJobPayload = {
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
      responsibilities: cleanArray(values.responsibilities),
      benefits: cleanArray(values.benefits),
      required_skills: cleanArray(values.required_skills),
      education_requirements: values.education_requirements.trim(),
      department: values.department.trim(),
      location: values.location.trim(),
      salary_min: Number(values.salary_min),
      salary_max: Number(values.salary_max),
      application_deadline: values.application_deadline.toISOString(),
      is_remote: values.location.trim().toLowerCase() === "remote",
    };

    createJob(payload, {
      onSuccess: () => {
        router.push("/admin/jobs");
      },
    });
  };

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 20, fontWeight: "bold" }}>Create New Job</h1>
          <p style={{ color: "#666" }}>
            Fill in the details to create a new job posting
          </p>
        </div>
        <Button onClick={() => router.push("/admin/jobs")}>
          <ArrowLeftOutlined /> Back to Jobs
        </Button>
      </div>

      {/* Form */}
      <Card>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{
            title: "",
            description: "",
            responsibilities: [],
            benefits: [],
            required_skills: [],
            education_requirements: "",
            department: "",
            location: "",
            job_type: "full_time",
            experience_level: "entry",
            salary_min: 0,
            salary_max: 0,
            salary_currency: "USD",
            is_remote: true,
            max_applications: 0,
            status: "active",
          }}
        >
          <Form.Item
            label="Job Title"
            name="title"
            rules={[{ required: true, message: "Job title is required" }]}
          >
            <Input placeholder="Frontend Developer" size="large" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <TextArea rows={5} size="large" />
          </Form.Item>

          {/* Responsibilities */}
          <Form.Item
            label="Responsibilities"
            name="responsibilities"
            rules={[
              { required: true, message: "Responsibilities are required" },
            ]}
          >
            <Select
              mode="tags"
              tokenSeparators={[","]}
              placeholder="Type a responsibility and press Enter"
              size="large"
            />
          </Form.Item>

          {/* Benefits */}
          <Form.Item
            label="Benefits"
            name="benefits"
            rules={[{ required: true, message: "Benefits are required" }]}
          >
            <Select
              mode="tags"
              tokenSeparators={[","]}
              placeholder="Type a benefit and press Enter"
              size="large"
            />
          </Form.Item>

          {/* Required Skills */}
          <Form.Item
            label="Required Skills"
            name="required_skills"
            rules={[{ required: true, message: "Skills are required" }]}
          >
            <Select
              mode="tags"
              tokenSeparators={[","]}
              placeholder="Type a skill and press Enter"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Education Requirements"
            name="education_requirements"
            rules={[
              { required: true, message: "Education requirement is required" },
            ]}
          >
            <Input placeholder="Bachelor's degree in..." size="large" />
          </Form.Item>

          {/* Department & Location */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true, message: "Department is required" }]}
              >
                <Select placeholder="Select department" size="large">
                  {departments.map((d) => (
                    <Option key={d} value={d}>
                      {d}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: "Location is required" }]}
              >
                <Input placeholder="Remote or City" size="large" />
              </Form.Item>
            </Col>
          </Row>

          {/* Job Type & Experience */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Job Type"
                name="job_type"
                rules={[{ required: true, message: "Job type is required" }]}
              >
                <Select size="large">
                  <Option value="full_time">Full-time</Option>
                  <Option value="part_time">Part-time</Option>
                  <Option value="contract">Contract</Option>
                  <Option value="internship">Internship</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Experience Level"
                name="experience_level"
                rules={[
                  { required: true, message: "Experience level is required" },
                ]}
              >
                <Select size="large">
                  <Option value="entry">Entry</Option>
                  <Option value="mid">Mid</Option>
                  <Option value="senior">Senior</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Salary */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Salary Min"
                name="salary_min"
                rules={[
                  { required: true, message: "Minimum salary is required" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Salary Max"
                name="salary_max"
                dependencies={["salary_min"]}
                rules={[
                  { required: true, message: "Maximum salary is required" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || value > getFieldValue("salary_min")) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Salary Max should be greater than Salary Min"
                        )
                      );
                    },
                  }),
                ]}
              >
                <InputNumber style={{ width: "100%" }} size="large" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Currency"
                name="salary_currency"
                rules={[{ required: true, message: "Currency is required" }]}
              >
                <Select size="large">
                  <Option value="USD">USD</Option>
                  <Option value="EUR">EUR</Option>
                  <Option value="GBP">GBP</Option>
                  <Option value="INR">INR</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Deadline */}
          <Form.Item
            label="Application Deadline"
            name="application_deadline"
            rules={[
              { required: true, message: "Deadline is required" },
              {
                validator(_, value) {
                  if (!value || value.isAfter(dayjs())) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Deadline must be a future date")
                  );
                },
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} size="large" />
          </Form.Item>

          {/* Max Applications */}
          <Form.Item
            label="Max Applications"
            name="max_applications"
            rules={[
              { required: true, message: "Max applications is required" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} size="large" />
          </Form.Item>

          {/* Status */}
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Status is required" }]}
          >
            <Select size="large">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          {/* Buttons */}
          <Form.Item>
            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant={"outline"}
                onClick={() => router.push("/admin/jobs")}
              >
                Cancel
              </Button>
              <Button loading={isPending}>
                {isPending ? "Creating..." : "Create Job"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
